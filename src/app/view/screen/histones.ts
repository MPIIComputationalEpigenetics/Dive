import { DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Experiment } from '../../domain/deepblue';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/primeng';
import { MultiSelect } from 'primeng/primeng';

import { BioSource } from 'app/domain/deepblue';
import { EpigeneticMark } from 'app/domain/deepblue';
import { FullExperiment } from 'app/domain/deepblue';
import { Genome } from 'app/domain/deepblue';
import { IdName } from 'app/domain/deepblue';
import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';
import { StackValue } from 'app/domain/operations';

import { DeepBlueService } from 'app/service/deepblue';
import { DataStack } from 'app/service/datastack';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { Statistics } from 'app/service/statistics';

@Component({
    selector: 'app-overlaps-bar-chart',
    styles: [`
      chart {
        display: block;
      }
    `],
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)">></chart>
    `
})
export class OverlapsBarChartComponent {
    options: Object;
    chart: Object;
    result_by_dataset_stack: Object;

    setNewData(categories, series) {
        console.log(series);
        this.chart['xAxis'][0].setCategories(categories, false);

        const point = {
            events: {
                click: function (click, e) {
                    // dummy function
                }
            }
        };

        const dataLabels = {
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
        };

        while (this.chart['series'].length > 0) {
            this.chart['series'][0].remove(false);
        }

        for (const serie of series) {
            if (serie['type'] === 'column') {
                serie['point'] = point;
                serie['point']['events']['click'] = (ev) => this.clickExperimentBar(ev);
                serie['dataLabels'] = dataLabels;
                serie['borderWidth'] = 0;
                this.chart['addSeries'](serie, false);
            } else if (serie['type'] === 'boxplot') {
                console.log('bloxplot');
                serie['tooltip'] = { headerFormat: '<em>Experiment No {point.key}</em><br/>' };
                serie['backgroundColor'] = 'red';
                this.chart['addSeries'](serie, false);
            }
        }

        // this.result_by_dataset_stack = result_by_dataset_stack;

        this.chart['redraw']();
    }

    hasData(): boolean {
        if (!this.chart) {
            return false;
        }
        return this.chart['series'][0]['data'].length > 0;
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    constructor(private deepBlueService: DeepBlueService) {
        this.options = {
            title: {
                text: `Overlapping with ${deepBlueService.getAnnotation().name}`
            },
            xAxis: {
                categories: []
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
            /*
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.point.key) {
                        s = "<em>Experiment No " + this.point.key + "</em><br/>";
                    }
                    if (this.point.name) { // the pie chart
                        s = this.point.name + ' ' + this.y + ' fruits';
                    } else {
                        s = this.series.name + ' : ' +
                            this.x + ': ' + this.y;
                    }
                    return s;
                }
            },
            */
            series: []
        };
    }

    clickExperimentBar(click) {
        const point = click.point;
        const category = point.category;
        const index = point.series.columnIndex;

        const stack_value: StackValue = this.result_by_dataset_stack[category][point.series.columnIndex];
        this.deepBlueService.setDataInfoSelected(stack_value);


        setTimeout(() => this.chart['reflow'](), 0);
    }
}


@Component({
    templateUrl: './histones.html'
})
export class HistonesScreenComponent implements OnDestroy {
    errorMessage: string;
    experiments: FullExperiment[];
    segregated_data: Object;

    biosourcesItems: SelectItem[] = [];
    selectedMultiSelectBiosources: Object[] = [];

    epigeneticMarkSubscription: Subscription;

    defaultSelectBiosourcesLabel = 'Select the Biosource';

    selectedExperimentsSource = new BehaviorSubject<IdName[]>([]);
    selectedExperimentsValue$: Observable<IdName[]> = this.selectedExperimentsSource.asObservable();


    selectedBioSourcesSource = new BehaviorSubject<IdName[]>([]);
    selectedBioSourcesValue$: Observable<IdName[]> = this.selectedBioSourcesSource.asObservable();

    currentlyProcessing: Object[] = [];

    current_request = 0;

    data: any;

    hasData = false;

    @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChartComponent;
    @ViewChild('multiselect') multiselect: MultiSelect;

    segregate(experiments: FullExperiment[]) {

        const biosources = {};
        const samples = {};
        const epigenetic_marks = {};
        const techniques = {};
        const projects = {};

        const event_items = [];
        const pre_selected_biosources = this.deepBlueService.selectedBioSources.getValue().map((x: BioSource) => x.name);

        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];

        for (const experiment of experiments) {
            const experiment_biosource = experiment.sample_info()['biosource_name'];
            const experiment_sample_id = experiment.sample_id();
            const experiment_epigenetic_mark = experiment.epigenetic_mark();
            const experiment_technique = experiment.technique();
            const experiment_project = experiment.project();

            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = [];
                const l = {
                    label: experiment_biosource,
                    value: { name: experiment_biosource, experiments: biosources[experiment_biosource] }
                };
                this.biosourcesItems.push(l);

                console.log(l.label);
                console.log(pre_selected_biosources);

                if (pre_selected_biosources.indexOf(l.label) > -1) {
                    event_items.push(l.value);
                    this.selectedMultiSelectBiosources.push(l.value);
                }
            }

            if (!(experiment_sample_id in samples)) {
                samples[experiment_sample_id] = [];
            }

            if (!(experiment_epigenetic_mark in epigenetic_marks)) {
                epigenetic_marks[experiment_epigenetic_mark] = [];
            }

            if (!(experiment_technique in techniques)) {
                techniques[experiment_technique] = [];
            }

            if (!(experiment_project in projects)) {
                projects[experiment_project] = [];
            }

            biosources[experiment_biosource].push(experiment);
            samples[experiment_sample_id].push(experiment);
            epigenetic_marks[experiment_epigenetic_mark].push(experiment);
            techniques[experiment_technique].push(experiment);
            projects[experiment_project].push(experiment);
        }

        this.selectBiosources({ value: event_items });

        return {
            'biosources': biosources,
            'samples': samples,
            'epigenetic_marks': epigenetic_marks,
            'techniques': techniques,
            'projects': projects
        };
    }

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(selected_epigenetic_mark => {
            this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(experiments_ids => {
                const ids = experiments_ids.map((e) => e.id);
                this.deepBlueService.getExperimentsInfos(ids).subscribe(full_info => {
                    this.experiments = <FullExperiment[]>full_info;
                    this.segregated_data = this.segregate(<FullExperiment[]>full_info);
                });
            },
                error => this.errorMessage = <any>error);
        });

        this.selectedExperimentsValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem) => this.processOverlaps());
    }

    selectBiosources(event) {
        let experiments: IdName[] = [];
        const selected_data = event.value;
        const biosources = event.value.map((x) => x.name);

        const exp_arrays = event.value.map((x) => x.experiments);
        experiments = experiments.concat.apply([], exp_arrays);

        this.selectedExperimentsSource.next(experiments);
        this.selectedBioSourcesSource.next(biosources);
    }

    processOverlaps() {
        const experiments = this.selectedExperimentsSource.getValue();

        if (experiments.length === 0) {
            this.reloadPlot([]);
            return;
        }

        if (experiments !== this.selectedExperimentsSource.getValue()) {
            this.reloadPlot([]);
            return;
        }

        if (experiments === this.currentlyProcessing) {
            return;
        }
        this.current_request++;

        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(experiments.length * this.selectedData.getStacksTopOperation().length * 5, this.current_request);
        this.currentlyProcessing = experiments;
        const start = new Date().getTime();


        const current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCountOverlaps(current, experiments).subscribe((request_id: string) => {
            console.log('request_id from middleware', request_id);

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element).subscribe((result: DeepBlueMiddlewareOverlapResult[]) => {
                const end = new Date().getTime();
                // Now calculate and output the difference
                console.log(end - start);
                this.currentlyProcessing = [];
                console.log(result);
                this.reloadPlot(result);
            });
        });
    }

    reloadPlot(datum: DeepBlueMiddlewareOverlapResult[]) {
        const result_by_dataset_stack = {};
        const categories: string[] = [];

        const value_by_stack_biosource: DeepBlueMiddlewareOverlapResult[][][] = [];

        for (const result of datum) {
            const stack_number = Number.parseInt(result.getDataName());
            const experiment = this.experiments.find((se: FullExperiment) => {
                if (se.name === result.getFilterName()) {
                    return true;
                }
                return false;
            });

            const biosource = experiment.biosource();

            if (!(stack_number in value_by_stack_biosource)) {
                value_by_stack_biosource[stack_number] = [];
            }

            if (!(biosource in value_by_stack_biosource[stack_number])) {
                if (categories.indexOf(biosource) === -1) {
                    categories.push(biosource);
                }
                value_by_stack_biosource[stack_number][biosource] = [];
            }

            value_by_stack_biosource[stack_number][biosource].push(result);
            result_by_dataset_stack[biosource] = [];
        }

        categories.sort((a: string, b: string) => {
            return a.localeCompare(b);
        });

        const value_by_stack: Array<Array<Object>> = [];

        for (let stack_pos = 0; stack_pos < value_by_stack_biosource.length; stack_pos++) {
            if (!(stack_pos in value_by_stack)) {
                value_by_stack[stack_pos] = [];
            }

            for (const biosource in value_by_stack_biosource[stack_pos]) {
                if (value_by_stack_biosource[stack_pos].hasOwnProperty(biosource)) {
                    const results = value_by_stack_biosource[stack_pos][biosource];

                    let high = Number.MIN_SAFE_INTEGER;
                    let low = Number.MAX_SAFE_INTEGER;
                    let sum = 0;

                    const values: Array<number> = [];
                    for (const result of results) {
                        const count = result.getCount();
                        if (count < low) {
                            low = count;
                        }
                        if (count > high) {
                            high = count;
                        }
                        sum += count;
                        values.push(count);
                    }

                    values.sort((a, b) => { return a - b; });

                    const mean = sum / values.length;

                    const q1 = Statistics.percentile(values, 0.25);
                    const q3 = Statistics.percentile(values, 0.75);
                    const median = Statistics.percentile(values, 0.5);

                    const aggr = { low: low, q1: q1, median: median, q3: q3, high: high, mean: mean, elements: values.length };

                    value_by_stack[stack_pos].push({ biosource: biosource, value: aggr });
                }

            }
        }

        const series: Array<Object> = [];
        for (let stack_pos = 0; stack_pos < value_by_stack.length; stack_pos++) {
            const stack_values = value_by_stack[stack_pos];
            const stack_values_result: Array<number> = [];
            const stack_values_result_boxplot: Array<Object> = [];

            stack_values.sort((a: Object, b: Object) => {
                return (<string>a['biosource']).localeCompare(b['biosource']);
            });

            console.log(stack_values.map((m) => m['biosource']));

            for (let i = 0; i < stack_values.length; i++) {
                const stack_value = stack_values[i];
                stack_values_result.push(stack_value['value']['mean']);
                stack_values_result_boxplot.push([
                    stack_value['value']['low'],
                    stack_value['value']['q1'],
                    stack_value['value']['median'],
                    stack_value['value']['q3'],
                    stack_value['value']['high']
                ]);
                result_by_dataset_stack[stack_value['biosource']][stack_pos] = stack_value;
            }

            series.push({
                type: 'boxplot',
                name: stack_pos.toString(),
                data: stack_values_result_boxplot,
                color: this.selectedData.getStackColor(stack_pos, '1')
            });

            series.push({
                type: 'column',
                name: stack_pos.toString(),
                data: stack_values_result,
                color: this.selectedData.getStackColor(stack_pos, '0.3')
            });
        }

        //this.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
        this.overlapbarchart.setNewData(categories, series);
    }

    selectExperimentBar(e) {
        const dataset = e.dataset;
        const element = e.element;
        const position = element._index;
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }
}
