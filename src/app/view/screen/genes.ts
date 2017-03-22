import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultiSelect } from 'primeng/primeng';

import { Dropdown, SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

import { BioSource, EpigeneticMark, FullExperiment, Genome, GeneModel } from 'app/domain/deepblue';

import { DataStackItem } from 'app/service/datastack';
import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement'

import { OverlapsBarChart } from 'app/view/screen/histones';

import { DeepBlueOperation} from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';

@Component({
    templateUrl: './genes.html'
})
export class GenesScreen {
    errorMessage: string;
    geneModels: GeneModel[];
    menuGeneModel: SelectItem[];
    selectedGeneModel:  SelectItem[];

    genomeSubscription: Subscription;

    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChart;
    @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;

    selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
    selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

    currentlyProcessing: GeneModel = null;
    current_request: number = 0;
    data: any;
    hasData: boolean = false;

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id == "") {
                return;
            }
            this.deepBlueService.getGeneModels().subscribe((geneModels: GeneModel[]) => {
                if (geneModels.length == 0) {
                    return;
                }
                this.geneModels = geneModels;
                this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
                    let l = { label: geneModel.name, value: geneModel };
                    this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        });

        this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem: DataStackItem) => this.processOverlaps())
    }

    selectGeneModel(event) {
        console.log(event.value);
        this.selectedGeneModelSource.next(event.value)
    }

    processOverlaps() {
        this.progress_element.reset(3, this.current_request);

        let gene_model = this.selectedGeneModelSource.getValue();

        if (gene_model == null) {
            this.reloadPlot([]);
            return;
        }

        if (gene_model != this.selectedGeneModelSource.getValue()) {
            this.reloadPlot([]);
            return;
        }

        if (gene_model == this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        this.currentlyProcessing = gene_model;

/*

        this.deepBlueService.selectGenes(gene_model, this.progress_element, this.current_request).subscribe((selected_genes: DeepBlueOperation) => {
            if (selected_genes.request_count != this.current_request) {
                return;
            }

            // Aqui eu mudo, pego todos os current operations das stacks
            let current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

            if (current == null) {
                this.reloadPlot([]);
                return;
            }

            this.deepBlueService.intersectWithSelected(current, [selected_genes], this.progress_element, this.current_request).subscribe((overlap_ids: DeepBlueOperation[]) => {
                if (overlap_ids.length == 0) {
                    this.reloadPlot([]);
                    return;
                }
                if (overlap_ids[0].request_count != this.current_request) {
                    return;
                }

                this.deepBlueService.countRegionsBatch(overlap_ids, this.progress_element, this.current_request).subscribe((datum: DeepBlueResult[]) => {

                    if (datum.length == 0) {
                        this.reloadPlot([]);
                        return;
                    }
                    if (datum[0].request_count != this.current_request) {
                        return;
                    }

                    this.currentlyProcessing = null;
                    this.reloadPlot(datum);
                })
            });
        });

*/
    }

    reloadPlot(datum: Object[]) {
        interface KeyValuePair extends Array<string | number | Object> { 0: string; 1: number; 2: Object }
        let newdata: Array<KeyValuePair> = [];

        datum.forEach((result: DeepBlueResult) => {
            newdata.push([result["data"]["name"], result["result"]["count"], result["data"]]);
        });

        //this.overlapbarchart.setNewData(newdata);
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
