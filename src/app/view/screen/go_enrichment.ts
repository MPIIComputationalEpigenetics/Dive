import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
import { DeepBlueMiddlewareGOEnrichtmentResult, DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultiSelect } from 'primeng/primeng';

import { Dropdown, SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BioSource, EpigeneticMark, FullExperiment, Genome, GeneModel } from 'app/domain/deepblue';

import { DataStackItem } from 'app/service/datastack';
import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';
import { Utils } from 'app/service/utils';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './go_enrichment.html'
})
export class GoEnrichmentScreenComponent implements OnDestroy {
    errorMessage: string;
    geneModels: GeneModel[];
    menuGeneModel: SelectItem[];
    selectedGeneModel: SelectItem[];

    genomeSubscription: Subscription;

    enrichment_data: Object[][] = new Array<Object[]>();
    enrichment_data_from_server: Object[][] = new Array<Object[]>();

    filter_go_overlap = '0';
    filter_ratio = '0';

    columns = [
        { name: 'id', prop: 'id', column_type: 'string' },
        { name: 'name', prop: 'name', column_type: 'string' },
        { name: 'go_overlap', prop: 'gooverlap', column_type: 'integer' },
        { name: 'ratio', prop: 'ratio', column_type: 'double' }
    ];

    @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;
    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChartComponent;

    selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
    selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id === '') {
                return;
            }
            this.deepBlueService.getGeneModelsBySelectedGenome().subscribe((geneModels: GeneModel[]) => {
                if (geneModels.length === 0) {
                    return;
                }
                this.geneModels = geneModels;
                this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
                    const l = { label: geneModel.name, value: geneModel };
                    this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        });

        this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processEnrichment());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem: DataStackItem) => this.processEnrichment());
    }

    filter_enrichment_data($event) {

        const newResults = [];
        for (let idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
            const x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
            newResults.push(x);
        }

        this.enrichment_data = newResults;
        this.plotBar();
    }

    filter_enrichment_datei(value: Object[]) {

        let go_overlap = Number.MIN_SAFE_INTEGER;
        if (this.filter_go_overlap) {
            go_overlap = Number(this.filter_go_overlap);
        }

        let ratio = Number.MIN_SAFE_INTEGER;
        if (this.filter_ratio) {
            ratio = Number(this.filter_ratio);
        }

        const filtered_data = [];
        for (let idx = 0; idx < value.length; idx++) {
            const row = value[idx];

            if ((row['gooverlap'] >= go_overlap) &&
                (row['ratio'] >= ratio)) {
                filtered_data.push(row);
            }
        }
        return filtered_data.sort((a: Object, b: Object) => b['gooverlap'] - a['gooverlap']);
    }

    selectGeneModel(event) {
        this.selectedGeneModelSource.next(event.value);
    }

    processEnrichment() {
        const gene_model = this.selectedGeneModelSource.getValue();

        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        const start = new Date().getTime();

        const current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCalculateGenesEnrichment(current, gene_model).subscribe((request_id: string) => {
            console.log('request_id from middleware', request_id);

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'go_enrichment')
                .subscribe((result: DeepBlueMiddlewareGOEnrichtmentResult[]) => {
                    const end = new Date().getTime();
                    console.log(result[0]['results']['enrichment']['go_terms'].length);
                    // Now calculate and output the difference
                    console.log(end - start);
                    console.log(result);
                    this.prepare_data(result);
                });
        });
    }

    prepare_data(datum: DeepBlueMiddlewareGOEnrichtmentResult[]) {

        this.enrichment_data_from_server = [];

        for (let pos = 0; pos < datum.length; pos++) {
            const data = datum[pos];
            const rows: Object[] = data.getResults()['enrichment']['go_terms'].filter((x) => {
                return x['go_overlap'] !== 0
            }).map((x) => {
                const row = {};
                for (let idx = 0; idx < this.columns.length; idx++) {
                    const column_name = this.columns[idx]['name'];
                    const v = x[column_name];
                    row[column_name.toLowerCase().replace('_', '')] = Utils.convert(v, this.columns[idx]['column_type'])
                }
                return row;
            });

            rows.sort((a: Object, b: Object) => b['go_overlap'] - a['go_overlap']);

            this.enrichment_data_from_server.push(rows);
        }

        this.filter_enrichment_data(null);
    }

    plotBar() {
        const categories = [];
        const categories_value = new Array<{}>();

        for (let stack = 0; stack < this.enrichment_data.length; stack++) {
            const data = this.enrichment_data[stack];
            const values_by_category = {}

            for (let term_pos = 0; term_pos < data.length; term_pos++) {
                const term = data[term_pos];

                const id = term['id'];
                const name = term['name'];
                const go_overlap = term['gooverlap'];

                const category = name + ' (' + id + ')';

                // If it is one of top 100 elements of the main stack
                // or if its values was found in the top 100 elements of the main stack
                if (stack === 0 && term_pos < 50) {
                    categories.push(category);
                    values_by_category[category] = go_overlap;
                } else if (stack > 0 && categories.indexOf(category) !== -1) {
                    console.log(values_by_category[category]);
                    values_by_category[category] = go_overlap;
                }
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
            }

            series.push({
                type: 'column',
                name: this.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: this.selectedData.getStackColor(stack_pos, '0.3')
            });
        }
        this.overlapbarchart.setNewData(categories, series, categories_value);
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
