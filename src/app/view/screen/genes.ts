import { DeepBlueMiddlewareRequest } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
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
export class GenesScreen implements AfterViewInit, OnDestroy {
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
            this.deepBlueService.getGeneModelsBySelectedGenome().subscribe((geneModels: GeneModel[]) => {
                if (geneModels.length === 0) {
                    return;
                }
                this.geneModels = geneModels;
                this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
                    const l = { label: geneModel.name, value: geneModel };
                    // Always select the last gene model
                    this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        });
    }

    ngAfterViewInit() {
        this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem: DataStackItem) => this.processOverlaps());
    }

    selectGeneModel(event: any) {
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
                .subscribe((result: DeepBlueResult[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    this.currentlyProcessing = null;
                    this.reloadPlot(result);
                });
        });

        if (gene_model === this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        this.currentlyProcessing = gene_model;
    }

    reloadPlot(datum: DeepBlueResult[]) {

        const series: Array<Object> = [];

        datum.forEach((result: DeepBlueResult, index: number) => {
            series.push({
                type: 'column',
                name: this.selectedData.getStackname(index),
                data: [result.resultAsCount()],
                color: this.selectedData.getStackColor(index, '0.3')
            });
        });

        const categories = datum.map((r: DeepBlueResult) => r.getFilter().name());

        this.overlapbarchart.setNewData(categories, series, null);
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
