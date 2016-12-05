import { MessagesDemo } from './messagesdemo';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Subject }     from 'rxjs/Subject'
import { Observable }     from 'rxjs/Observable'

import { IdName, 
         Genome, 
         EpigeneticMark } from '../domain/deepblue'

import { DeepBlueService, 
         SelectedData, 
         DeepBlueOperation,
         DeepBlueResult } from '../service/deepblue';


@Component({
    selector: 'histones-summary',
    templateUrl: 'app/demo/view/histones.screen.html'
})
export class HistonesScreen {
    errorMessage: string;
    experiments: Object[];
    segregated_data: Object;

    biosourcesItems: SelectItem[] = [];
    selectedMultiSelectBiosources: string[] = [];

    epigeneticMarkSubscription: Subscription;

    defaultSelectBiosourcesLabel: string = "Select the Biosource"

    selectedExperiments: Object[] = [];
    currentlyProcessing: Object[] = [];    

    data: any;
    
    getSelectedExperiments() : Object[] {
        return this.selectedExperiments;
    }

    segregate(experiments: Object[]) {

        var biosources = {}
        var samples = {}
        var epigenetic_marks = {}
        var techniques = {}
        var projects = {}
        

        for (let experiment of experiments) {
            let experiment_biosource = experiment['sample_info']['biosource_name'];
            let experiment_sample_id = experiment['sample_id'];
            let experiment_epigenetic_mark = experiment['epigenetic_mark'];
            let experiment_technique = experiment['technique'];
            let experiment_project = experiment['project'];

            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = []
                this.biosourcesItems.push(
                    {label: experiment_biosource, value: biosources[experiment_biosource]}
                )
            }
                    
            if (!(experiment_sample_id in samples)) {
                samples[experiment_sample_id] = []
            }        
            
            if (!(experiment_epigenetic_mark in epigenetic_marks)) {
                epigenetic_marks[experiment_epigenetic_mark] = []
            }            
            
            if (!(experiment_technique in techniques)) {
                techniques[experiment_technique] = []
            }

            if (!(experiment_project in projects)) {
                projects[experiment_project] = []
            }

            biosources[experiment_biosource].push(experiment);
            samples[experiment_sample_id].push(experiment);
            epigenetic_marks[experiment_epigenetic_mark].push(experiment);
            techniques[experiment_technique].push(experiment);
            projects[experiment_project].push(experiment);
        }

        return {
            "biosources": biosources, 
            "samples": samples, 
            "epigenetic_marks": epigenetic_marks,
            "techniques": techniques,
            "projects": projects }
    }

    constructor (private deepBlueService: DeepBlueService) {
        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(
            selected_epigenetic_mark => {
                this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(
                    experiments_ids => {                                                                      
                        var ids = experiments_ids.map((e) => e.id); 
                        this.deepBlueService.getInfos(ids).subscribe(                            
                            full_info => {
                                this.experiments = full_info;
                                this.segregated_data = this.segregate(full_info);
                            }
                        );
                    },
                    error => this.errorMessage = <any>error);
            }
        );

        this.getSelectedExperimentsObservable().subscribe((experiments: Object[]) => {
            if (experiments.length == 0) {
                return;
            }
            
            if (experiments != this.getSelectedExperiments()) {
                return;
            }

            if (experiments == this.currentlyProcessing) {
                return;
            }

            this.currentlyProcessing = experiments;

            this.deepBlueService.selectMultipleExperiments(experiments).subscribe((selected_experiments : DeepBlueOperation[]) => {
                console.log(selected_experiments);

                this.deepBlueService.overlapWithSelected(selected_experiments).subscribe((overlap_ids: DeepBlueOperation[]) => {
                    console.log(overlap_ids);

                    this.deepBlueService.countRegionsBatch(overlap_ids).subscribe((datum: DeepBlueResult[]) => {
                        console.log("DATUM:", datum);
                        this.reloadPlot(datum);
                    })
                });
             });
        });
        
    
        this.data = {
            labels: [],
            datasets: []
        }        
    }

    setSelectedExperiments(experiments: Object[]) {
        this.selectedExperiments = experiments;
    }

    getSelectedExperimentsObservable() : Observable<Object[]> {
        return Observable.interval(500).map((a) => {
            return this.getSelectedExperiments();
        });
    }
    
    selectBiosources(event) {
      var experiments : Object[] = [];
      experiments = experiments.concat.apply([], event.value);
      this.setSelectedExperiments(experiments);
    }
                              
    reloadPlot(datum: Object[]) {
        let plot_data: Number[] = [];
        let labels: string[] = [];

        datum.forEach((result: DeepBlueResult) => {
            plot_data.push(result["result"]["count"]);
            labels.push(result["data"]["name"]);
        });

        
        let datasets = [
            {
                label: 'Overlaps',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: plot_data
            }
        ]

        this.data["labels"] = labels;
        this.data["datasets"] = datasets;
    }

    selectExperimentBar(e) {
        let dataset = e.dataset;
        let element = e.element;
        let position = element._index;

        console.log(dataset[position]);
    }

    click(e, bar) {
        console.log(e);
        console.log(bar);
    }

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }  
}