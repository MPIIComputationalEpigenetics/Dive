import { DeepBlueMiddlewareGOEnrichtmentResult, DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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

@Component({
    templateUrl: './go_enrichment.html'
})
export class GoEnrichmentScreen implements OnDestroy {
    errorMessage: string;
    geneModels: GeneModel[];
    menuGeneModel: SelectItem[];
    selectedGeneModel: SelectItem[];

    genomeSubscription: Subscription;

    enrichment_data: DeepBlueMiddlewareGOEnrichtmentResult[] = [];

    columns = [
        { name: 'id', prop: 'id', column_type: 'string' },
        { name: 'name', prop: 'name', column_type: 'string' },
        { name: 'go_colocated', prop: 'gocolocated', column_type: 'string' },
        { name: 'ratio', prop: 'ratio', column_type: 'number' },
        { name: 'p_value', prop: 'pvalue', column_type: 'number' }
    ];

    @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;

    selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
    selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

    currentlyProcessing: GeneModel = null;
    current_request = 0;
    data: any;
    hasData = false;

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id === '') {
                return;
            }
            this.deepBlueService.getGeneModels().subscribe((geneModels: GeneModel[]) => {
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

    selectGeneModel(event) {
        console.log(event.value);
        this.selectedGeneModelSource.next(event.value);
    }

    processEnrichment() {
        this.progress_element.reset(3, this.current_request);

        const gene_model = this.selectedGeneModelSource.getValue();

        if (gene_model == null) {
            this.reloadPlot([]);
            return;
        }

        if (gene_model !== this.selectedGeneModelSource.getValue()) {
            this.reloadPlot([]);
            return;
        }

        this.current_request++;

        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(0, this.current_request);
        this.currentlyProcessing = gene_model;
        const start = new Date().getTime();

        const current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCalculateEnrichment(current, gene_model).subscribe((request_id: string) => {
            console.log('request_id from middleware', request_id);

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'go_enrichment')
                .subscribe((result: DeepBlueMiddlewareGOEnrichtmentResult[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    console.log(end - start);
                    this.currentlyProcessing = null;
                    console.log(result);
                    this.reloadPlot(result);
                });
        });

        if (gene_model === this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        this.currentlyProcessing = gene_model;
    }

    convert(value: string, column_type: string): Object {
        if ((column_type === 'string') || (column_type === 'category')) {
            return value;
        }

        if (column_type === 'double') {
            return parseFloat(value);
        }

        if (column_type === 'integer') {
            return parseInt(value);
        }

        return value;
    }

    reloadPlot(datum: DeepBlueMiddlewareGOEnrichtmentResult[]) {

        this.enrichment_data = [];

        for (let pos = 0; pos < datum.length; pos++) {
            const data = datum[pos];
            const rows = data.results['enrichment']['go_terms'].map((x) => {

                const row = {};

                for (let idx = 0; idx < this.columns.length; idx++) {
                    const column_name = this.columns[idx]['name'];
                    const v = x[column_name];
                    row[column_name.toLowerCase().replace('_', '')] = this.convert(v, this.columns[idx]['column_type'])
                }

                return row;
            });

            this.enrichment_data.push(rows);
        }

        const series: Array<Object> = [];

        datum.forEach((result: DeepBlueMiddlewareGOEnrichtmentResult, index: number) => {
            series.push({
                type: 'column',
                name: this.selectedData.getStackname(index),
                data: [result.getResults()],
                color: this.selectedData.getStackColor(index, '0.3')
            });
        });


    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
