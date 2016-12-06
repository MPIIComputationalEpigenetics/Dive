import { MessagesDemo } from './messagesdemo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Subject }     from 'rxjs/Subject'
import { Observable }     from 'rxjs/Observable'

import { IdName, 
         Genome, 
         EpigeneticMark } from '../domain/deepblue'

import { DataLoadProgressBar } from '../view/deepblue';


import { DeepBlueService, 
         SelectedData, 
         DeepBlueOperation,
         DeepBlueResult } from '../service/deepblue';

 
@Component({
    selector: 'simple-chart-example',
    template: `
        <chart [options]="options"></chart>
    `
})
export class SimpleChart {
    constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
    options: Object;
}


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

    current_request: number = 0;

    data: any;

    @ViewChild('progressbar') progressbar: DataLoadProgressBar
    
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
            this.current_request++;

            // Each experiment is selected, overlaped, count, get request data (4 times each)
            this.progressbar.reset(experiments.length * 4, this.current_request);
            this.currentlyProcessing = experiments;

            this.deepBlueService.selectMultipleExperiments(experiments, this.progressbar, this.current_request).subscribe((selected_experiments : DeepBlueOperation[]) => {
                if (selected_experiments.length == 0) {
                    return;
                }
                if (selected_experiments[0].request_count != this.current_request) {
                    console.log("new request executing, leaving...");
                    return;
                }          
                      
                this.deepBlueService.overlapWithSelected(selected_experiments, this.progressbar, this.current_request).subscribe((overlap_ids: DeepBlueOperation[]) => {

                    if (overlap_ids.length == 0) {
                        return;
                    }
                    if (overlap_ids[0].request_count != this.current_request) {
                        console.log("new request executing, leaving...");
                        return;
                    }          

                    this.deepBlueService.countRegionsBatch(overlap_ids, this.progressbar, this.current_request).subscribe((datum: DeepBlueResult[]) => {

                        if (datum.length == 0) {
                            return;
                        }
                        if (datum[0].request_count != this.current_request) {
                            console.log("new request executing, leaving...");
                            return;
                        }          
                                                
                        console.log("DATUM:", datum);
                        this.reloadPlot(datum);
                    })
                });
             });
        });
        
    
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
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
        debugger;
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
        ];

        let data = {
            "labels": labels,
            "datasets": datasets
        }
        this.data = data;
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