import { SelectedData } from '../service/selecteddata';
import { ProgressElement } from '../service/progresselement';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

import { MultiSelect } from 'primeng/primeng';


import { BioSource, EpigeneticMark, FullExperiment, Genome, IdName } from '../domain/deepblue';

import { DeepBlueService } from '../service/deepblue';

import { DeepBlueOperation, DeepBlueResult, StackValue } from '../domain/operations';


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
    chart: Object;
    Object
    setNewData(data) {
        return this.chart["series"][0].setData(data);
    }

    hasData(): boolean {
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
                data: [],
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
        let experiment: IdName = point.series.options.data[category][2];

        this.deepBlueService.setDataInfoSelected(experiment);
        setTimeout(() => this.chart["reflow"](), 0);
    }
}


@Component({
    templateUrl: './histones.screen.html'
})
export class HistonesScreen {
    errorMessage: string;
    experiments: FullExperiment[];
    segregated_data: Object;

    biosourcesItems: SelectItem[] = [];
    selectedMultiSelectBiosources: Object[] = [];

    epigeneticMarkSubscription: Subscription;

    defaultSelectBiosourcesLabel: string = "Select the Biosource"

    selectedExperimentsSource = new BehaviorSubject<IdName[]>([]);
    selectedExperimentsValue$: Observable<IdName[]> = this.selectedExperimentsSource.asObservable();


    selectedBioSourcesSource = new BehaviorSubject<IdName[]>([]);
    selectedBioSourcesValue$: Observable<IdName[]> = this.selectedBioSourcesSource.asObservable();

    currentlyProcessing: Object[] = [];

    current_request: number = 0;

    data: any;

    hasData: boolean = false;

    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChart;
    @ViewChild('multiselect') multiselect: MultiSelect;

    segregate(experiments: FullExperiment[]) {

        let biosources = {}
        let samples = {}
        let epigenetic_marks = {}
        let techniques = {}
        let projects = {}

        let event_items = [];
        let pre_selected_biosources = this.deepBlueService.selectedBioSources.getValue().map((x: BioSource) => x.name);

        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];

        for (let experiment of experiments) {
            let experiment_biosource = experiment.sample_info()['biosource_name'];
            let experiment_sample_id = experiment.sample_id();
            let experiment_epigenetic_mark = experiment.epigenetic_mark();
            let experiment_technique = experiment.technique();
            let experiment_project = experiment.project();

            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = []
                let l = { label: experiment_biosource, value: { name: experiment_biosource, experiments: biosources[experiment_biosource] } }
                this.biosourcesItems.push(l);

                console.log(l.label);
                console.log(pre_selected_biosources);

                if (pre_selected_biosources.indexOf(l.label) > -1) {
                    event_items.push(l.value);
                    this.selectedMultiSelectBiosources.push(l.value);
                }
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

        this.selectBiosources({ value: event_items });

        return {
            "biosources": biosources,
            "samples": samples,
            "epigenetic_marks": epigenetic_marks,
            "techniques": techniques,
            "projects": projects
        }
    }

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(selected_epigenetic_mark => {
            this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(experiments_ids => {
                var ids = experiments_ids.map((e) => e.id);
                this.deepBlueService.getExperimentsInfos(ids).subscribe(full_info => {
                    this.experiments = <FullExperiment[]>full_info;
                    this.segregated_data = this.segregate(<FullExperiment[]>full_info);
                });
            },
                error => this.errorMessage = <any>error);
        });

        this.selectedExperimentsValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem) => this.processOverlaps())
    }

    processOverlaps() {
        let experiments = this.selectedExperimentsSource.getValue();

        if (experiments.length == 0) {
            this.reloadPlot([]);
            return;
        }

        if (experiments != this.selectedExperimentsSource.getValue()) {
            this.reloadPlot([]);
            return;
        }

        if (experiments == this.currentlyProcessing) {
            return;
        }
        this.current_request++;

        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(experiments.length * 5, this.current_request);
        this.currentlyProcessing = experiments;

        this.deepBlueService.selectMultipleExperiments(experiments, this.progress_element, this.current_request).subscribe((selected_experiments: DeepBlueOperation[]) => {
            if (selected_experiments.length == 0) {
                this.reloadPlot([]);
                return;
            }
            if (selected_experiments[0].request_count != this.current_request) {
                return;
            }

            let current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

            if (current == null) {
                this.reloadPlot([]);
                return;
            }

            this.deepBlueService.intersectWithSelected(current, selected_experiments, this.progress_element, this.current_request).subscribe((overlap_ids: StackValue[]) => {
                if (overlap_ids.length == 0) {
                    this.reloadPlot([]);
                    return;
                }
                if (overlap_ids[0].getDeepBlueOperation().request_count != this.current_request) {
                    return;
                }

                this.deepBlueService.countRegionsBatch(overlap_ids, this.progress_element, this.current_request).subscribe((datum: StackValue[]) => {

                    if (datum.length == 0) {
                        this.reloadPlot([]);
                        return;
                    }
                    if (datum[0].getDeepBlueOperation().request_count != this.current_request) {
                        return;
                    }

                    this.currentlyProcessing = [];
                    this.reloadPlot(datum);
                })
            });
        });
    }

    selectBiosources(event) {
        let experiments: IdName[] = [];
        let selected_data = event.value;
        let biosources = event.value.map((x) => x.name);

        let exp_arrays = event.value.map((x) => x.experiments)
        experiments = experiments.concat.apply([], exp_arrays);

        this.selectedExperimentsSource.next(experiments);
        this.selectedBioSourcesSource.next(biosources);
    }

    reloadPlot(datum: Object[]) {
        interface KeyValuePair extends Array<string | number | Object> { 0: string; 1: number; 2: Object }
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

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }
}