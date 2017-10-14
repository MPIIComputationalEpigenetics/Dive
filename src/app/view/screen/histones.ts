import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
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

        const biosources: { [key: string]: FullExperiment[] } = {};
        const samples: { [key: string]: FullExperiment[] } = {};
        const epigenetic_marks: { [key: string]: FullExperiment[] } = {};
        const techniques: { [key: string]: FullExperiment[] } = {};
        const projects: { [key: string]: FullExperiment[] } = {};

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

    constructor(public deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(selected_epigenetic_mark => {
            this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(experiments_ids => {
                const ids = experiments_ids.map((e) => e.id.id);
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

    selectBiosources(event: any) {
        let experiments: IdName[] = [];
        const selected_data = event.value;
        const biosources = event.value.map((x: any) => x.name);

        const exp_arrays = event.value.map((x: any) => x.experiments);
        experiments = experiments.concat.apply([], exp_arrays);

        this.selectedExperimentsSource.next(experiments);
        this.selectedBioSourcesSource.next(biosources);
    }

    processOverlaps() {
        const experiments = this.selectedExperimentsSource.getValue();

        if (experiments.length === 0) {
            this.reloadPlot(this, []);
            return;
        }

        if (experiments !== this.selectedExperimentsSource.getValue()) {
            this.reloadPlot(this, []);
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


        const current = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCountOverlaps(current, experiments).subscribe((request_id: string) => {
            console.log('request_id from middleware', request_id);

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'overlaps', this.reloadPlot, this)
                .subscribe((result: DeepBlueMiddlewareOverlapResult[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    console.log(end - start);
                    this.currentlyProcessing = [];
                    console.log(result);
                    this.reloadPlot(this, result);
                });
        });
    }

    reloadPlot(_self: HistonesScreenComponent, datum: DeepBlueMiddlewareOverlapResult[]) {
        console.log("MAGIG???");

        const categories: string[] = [];

        const value_by_stack_biosource: Array<
        {
          [key: string]: DeepBlueMiddlewareOverlapResult[]
        }> = [];

        const result_by_dataset_stack: {
            [key: string]: {
              [key: string]: DeepBlueMiddlewareOverlapResult[]
            }
          } = {};

        for (const result of datum) {
            const stack_number =  _self.selectedData.getStackPosByQueryId(result.getDataQuery());
            const experiment = _self.experiments.find((se: FullExperiment) => {
                if (se.name === result.getFilterName()) {
                    return true;
                }
                return false;
            });

            const biosource = experiment.biosource();

            if (!(stack_number in value_by_stack_biosource)) {
                value_by_stack_biosource[stack_number] = {};
            }

            if (!(biosource in value_by_stack_biosource[stack_number])) {
                if (categories.indexOf(biosource) === -1) {
                    categories.push(biosource);
                }
                value_by_stack_biosource[stack_number][biosource] = [];
            }

            value_by_stack_biosource[stack_number][biosource].push(result);
            result_by_dataset_stack[biosource] = {};
        }

        categories.sort((a: string, b: string) => {
            return a.localeCompare(b);
        });

        const value_by_stack: Array<Array<any>> = [];

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

                    value_by_stack[stack_pos].push({ biosource: biosource, value: aggr, results: results });
                }

            }
        }

        const series: Array<Object> = [];
        for (let stack_pos = 0; stack_pos < value_by_stack.length; stack_pos++) {
            const stack_values = value_by_stack[stack_pos];
            const stack_values_result: Array<number> = [];
            const stack_values_result_boxplot: Array<Object> = [];

            stack_values.sort((a: any, b: any) => {
                return (<string>a['biosource']).localeCompare(b['biosource']);
            });

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
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result_boxplot,
                color: _self.selectedData.getStackColor(stack_pos, '1')
            });

            series.push({
                type: 'column',
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: _self.selectedData.getStackColor(stack_pos, '0.3')
            });
        }

        _self.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
    }

    hasDataDetail(): boolean {
        return this.deepBlueService.getDataInfoSelected() != null;
    }

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }
}
