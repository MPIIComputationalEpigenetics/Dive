import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
import { DeepBlueMiddlewareGOEnrichtmentResult, DeepBlueMiddlewareRequest } from '../../domain/operations';
import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { GeneModel } from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

import { Utils } from 'app/service/utils';
import { RequestManager } from 'app/service/requests-manager';
import { SelectedData } from 'app/service/selected-data';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { TabView } from 'primeng/components/tabview/tabview';

@Component({
    templateUrl: './go-enrichment.html'
})
export class GoEnrichmentScreenComponent implements AfterViewInit, OnDestroy {
    selectedTab = 0;
    isWaiting: boolean = true;
    errorMessage: string;
    geneModels: GeneModel[];
    menuGeneModel: SelectItem[];
    selectedGeneModel: SelectItem[];

    genomeSubscription: Subscription;

    enrichment_data: Object[][] = new Array<Object[]>();
    enrichment_data_from_server: Object[][] = new Array<Object[]>();

    filter_go_overlap = '5';
    filter_ratio = '15';
    filter_p_value = '5';

    current_request = 0;

    showDataDetail = false;
    selectedGoTerm = ""

    columns = [
        { name: 'id', prop: 'id', column_type: 'string' },
        { name: 'name', prop: 'name', column_type: 'string' },
        { name: 'go_overlap', prop: 'gooverlap', column_type: 'integer' },
        { name: 'ratio', prop: 'ratio', column_type: 'double' },
        { name: 'p_value', prop: 'pvalue', column_type: 'double' }
    ];

    @ViewChild('geneModelDropdown', { static: true }) geneModelDropdown: Dropdown;
    @ViewChild('overlapbarchart', { static: true }) overlapbarchart: OverlapsBarChartComponent;
    @ViewChild('tabview', { static: true }) tabview: TabView;

    selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
    selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

    constructor(private deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, public selectedData: SelectedData) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
                return;
            }
            this.deepBlueService.getGeneModelsBySelectedGenome().subscribe((geneModels: GeneModel[]) => {
                if (geneModels.length === 0) {
                    return;
                }
                this.geneModels = geneModels;
                this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
                    const l = { label: geneModel.name, value: geneModel };
                    this.geneModelDropdown.selectItem({}, l);
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        });
    }

    ngAfterViewInit() {
        this.selectedGeneModelValue$.debounceTime(250).subscribe(_ => this.processEnrichment());
        this.selectedData.activeTopStackValue$.subscribe(_ => this.processEnrichment());
    }

    filter_enrichment_data() {
        const newResults = [];
        for (let idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
            const x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
            newResults.push(x);
        }
        this.enrichment_data = newResults;

        if (this.selectedTab > this.enrichment_data.length - 1) {
            this.selectedTab = 0;
        }
        this.tabview.activeIndex = this.selectedTab;
        this.plotBar();
    }

    filter_enrichment_datei(value: Object[]) {

        let go_overlap = Number.MIN_SAFE_INTEGER;
        if (this.filter_go_overlap) {
            go_overlap = Number(this.filter_go_overlap);
        }

        let ratio = Number.MIN_SAFE_INTEGER;
        if (this.filter_ratio) {
            ratio = Number(this.filter_ratio) / 100;
        }

        let p_value = Number.MAX_SAFE_INTEGER;
        if (this.filter_p_value) {
            p_value = Number(this.filter_p_value);
        }

        const filtered_data = [];
        for (let idx = 0; idx < value.length; idx++) {
            const row: any = value[idx];
            if ((row['gooverlap'] >= go_overlap) &&
                (row['ratio'] >= ratio) &&
                (row['pvalue'] < p_value)) {
                filtered_data.push(row);
            }
        }
        return filtered_data.sort((a: any, b: any) => b['pvalue'] - a['pvalue']);
    }

    selectGeneModel(event: any) {
        this.selectedGeneModelSource.next(event.value);
    }

    processEnrichment() {
        const gene_model = this.selectedGeneModelSource.getValue();

        if (!gene_model) {
            return;
        }

        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        const start = new Date().getTime();

        const current = this.selectedData.getStacksTopOperation();

        this.progress_element.reset(this.selectedData.getStacksTopOperation().length, this.current_request);

        this.deepBlueService.composedCalculateGenesEnrichment(current, gene_model).subscribe((request: DeepBlueMiddlewareRequest) => {
            this.isWaiting = true;
            this.requestManager.cancelAllRequest();
            this.requestManager.enqueueRequest(request);
            this.deepBlueService.getComposedResultIterator(request, 'go_enrichment', this.prepare_data, this)
                .subscribe((result: DeepBlueMiddlewareGOEnrichtmentResult[]) => {
                    if (result.length > 0) {
                        this.isWaiting = false;
                        this.prepare_data(this, result);
                    }
                });
        });
    }

    prepare_data(_self: GoEnrichmentScreenComponent, datum: DeepBlueMiddlewareGOEnrichtmentResult[]) {
        _self.enrichment_data_from_server = [];

        for (let pos = 0; pos < datum.length; pos++) {
            const data = datum[pos];

            const rows: any[] = data.getResults()['enrichment']['go_terms'].filter((x: any) => {
                return x['go_overlap'] !== 0
            }).map((x: any) => {
                const row: { [key: string]: any } = {};
                for (let idx = 0; idx < _self.columns.length; idx++) {
                    const column_name = _self.columns[idx]['name'];
                    const v = x[column_name];
                    row[column_name.toLowerCase().replace('_', '')] = Utils.convert(v, _self.columns[idx]['column_type'])
                }
                return row;
            });

            rows.sort((a: any, b: any) => b['go_overlap'] - a['go_overlap']);

            _self.enrichment_data_from_server.push(rows);
        }

        _self.filter_enrichment_data();
    }

    plotBar() {
        const categories = [];
        const categories_value = new Array<any>();
        const category_id: {
            [key: string]: string
        } = {};
        const result_by_dataset_stack: {
            [key: string]: {
                [key: string]: string
            }
        } = {};

        for (let stack = 0; stack < this.enrichment_data.length; stack++) {
            const data = this.enrichment_data[stack];
            const values_by_category: { [key: string]: any } = {};

            for (let term_pos = 0; term_pos < data.length; term_pos++) {
                const term: any = data[term_pos];

                const id = term['id'];
                const name = term['name'];
                const go_overlap = term['gooverlap'];

                const category = name + ' (' + id + ')';
                category_id[category] = id;

                // If it is one of top 100 elements of the main stack
                // or if its values was found in the top 100 elements of the main stack
                if (stack === 0 && term_pos < 50) {
                    categories.push(category);
                    values_by_category[category] = go_overlap;
                } else if (stack > 0 && categories.indexOf(category) !== -1) {
                    values_by_category[category] = go_overlap;
                }

                result_by_dataset_stack[category] = {};
            }

            categories_value.push(values_by_category);
        }

        const series: Array<Object> = [];
        for (let stack_pos = 0; stack_pos < categories_value.length; stack_pos++) {
            const stack_values_result: Array<number> = [];
            const stack_categories_values = categories_value[stack_pos];
            for (let cat_pos = 0; cat_pos < categories.length; cat_pos++) {
                const category = categories[cat_pos];
                if (stack_categories_values[category]) {
                    stack_values_result.push(stack_categories_values[category]);
                } else {
                    stack_values_result.push(0)
                }
                result_by_dataset_stack[category][stack_pos] = category_id[category];
            }

            series.push({
                type: 'column',
                name: this.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: this.selectedData.getStackColor(stack_pos, '0.3')
            });
        }
        this.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
    }

    onTabChange($event: any) {
        this.selectedTab = $event.index;
    }

    onTableClick($event: any) {
        if ($event.type == "click") {
            this.selectedGoTerm = $event.row.id;
            this.showDataDetail = true;
        }
    }

    setDataInfo($event: any) {
        this.selectedGoTerm = $event;
        this.showDataDetail = true;
    }

    filterOverlapping(term: string) {
        const gene_model = this.selectedGeneModelSource.getValue();
        this.selectedData.activeStackSubject.getValue().overlapGoTerm(term, gene_model);
        this.showDataDetail = false;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
