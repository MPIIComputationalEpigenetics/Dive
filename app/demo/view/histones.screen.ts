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
    selector: 'overlaps-bar-chart',
    styles: [`
      chart {
        display: block;
      }
    `],    
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)">></chart>
    `
})
export class OverlapsBarChart {
    options: Object;
    chart : Object;

    setNewData(data) {
        return this.chart["series"][0].setData(data); 
    }

    hasData() : boolean {
        if (!this.chart) {
            return false;
        }        
        return this.chart["series"][0]["data"].length > 0;
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    constructor(private deepBlueService: DeepBlueService) {
        this.options = {            
            chart: {
            type: 'column'
            },
            title: {
                text: `Overlapping with ${deepBlueService.getAnnotation().name}`
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            credits: {
                enabled: false
            },  
            width: null,
            height: null,          
            yAxis: {
                min: 0,
                title: {
                    text: 'Overlaped peaks (regions)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: `Overlap with ${deepBlueService.getAnnotation().name}: <b>{point.y} peaks</b>`
            },
            series: [{
                name: 'Overlaping',
                data: [ ],
                point: {
                        events: {
                            click: function (click, e) {
                                // Dummy function that will be overwrited bellow.
                            }
                        }
                },
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },            
            }]
        }
        this.options['series'][0]['point']['events']['click'] = (ev) => this.clickExperimentBar(ev);
    }

    clickExperimentBar(click) {
        let point = click.point;
        let category = point.category;
        let experiment = point.series.options.data[category][2];
        
        this.deepBlueService.includeFilter(experiment);
        this.deepBlueService.setDataInfoSelected(experiment);
        setTimeout(() => this.chart.reflow(), 0);        
    }
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

    hasData: boolean = false;

    @ViewChild('progressbar') progressbar: DataLoadProgressBar;
    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChart;
    
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

            // Each experiment is started, selected, overlaped, count, get request data (4 times each)
            this.progressbar.reset(experiments.length * 5, this.current_request);
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
    }

    setSelectedExperiments(experiments: Object[]) {
        this.selectedExperiments = experiments;
    }

    getSelectedExperimentsObservable() : Observable<Object[]> {
        return Observable.interval(25).map((a) => {
            return this.getSelectedExperiments();
        });
    }
    
    selectBiosources(event) {
      var experiments : Object[] = [];
      experiments = experiments.concat.apply([], event.value);
      this.setSelectedExperiments(experiments);
    }
                              
    reloadPlot(datum: Object[]) {
        interface KeyValuePair extends Array<string | number | Object> { 0: string; 1: number; 2: Object}
        let newdata: Array<KeyValuePair> = [];

        datum.forEach((result: DeepBlueResult) => {
            newdata.push([result["data"]["name"], result["result"]["count"], result["data"]]);
        });

        this.overlapbarchart.setNewData(newdata);
    }

    selectExperimentBar(e) {
        let dataset = e.dataset;
        let element = e.element;
        let position = element._index;

        console.log(dataset[position]);
    }
    
    hasDataDetail() : boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }  
}