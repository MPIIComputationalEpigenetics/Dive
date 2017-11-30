import { DeepBlueMiddlewareOverlapResult, DeepBlueMiddlewareRequest } from '../../domain/operations';
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

import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';
import { RequestManager } from 'app/service/requests-manager';

@Component({
    templateUrl: './genes.html'
})
export class GenesScreen implements OnDestroy {
    errorMessage: string;
    geneModels: GeneModel[];
    menuGeneModel: SelectItem[];
    selectedGeneModel: SelectItem[];

    genomeSubscription: Subscription;

    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChartComponent;
    @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;

    selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
    selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

    currentlyProcessing: GeneModel = null;
    current_request = 0;
    data: any;
    hasData = false;

    constructor(public deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
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

        this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem: DataStackItem) => this.processOverlaps());
    }

    selectGeneModel(event: any) {
        console.log(event.value);
        this.selectedGeneModelSource.next(event.value);
    }

    processOverlaps() {
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

        const current = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCountGenesOverlaps(current, gene_model).subscribe((request: DeepBlueMiddlewareRequest) => {
            this.requestManager.enqueueRequest(request);
            this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'overlaps')
                .subscribe((result: DeepBlueMiddlewareOverlapResult[]) => {
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

    reloadPlot(datum: DeepBlueMiddlewareOverlapResult[]) {

        const series: Array<Object> = [];

        datum.forEach((result: DeepBlueMiddlewareOverlapResult, index: number) => {
            series.push({
                type: 'column',
                name: this.selectedData.getStackname(index),
                data: [result.getCount()],
                color: this.selectedData.getStackColor(index, '0.3')
            });
        });

        const categories = datum.map((r: DeepBlueMiddlewareOverlapResult) => r.getFilterName());

        this.overlapbarchart.setNewData(categories, series, null);
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
