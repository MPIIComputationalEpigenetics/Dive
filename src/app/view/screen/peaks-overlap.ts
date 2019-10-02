import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
import { DeepBlueMiddlewareRequest } from '../../domain/operations';
import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BioSource } from 'app/domain/deepblue';
import { FullExperiment } from 'app/domain/deepblue';
import { IdName } from 'app/domain/deepblue';
import { DeepBlueResult } from 'app/domain/operations';

import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

import { Statistics } from 'app/service/statistics';
import { RequestManager } from 'app/service/requests-manager';
import { SelectedData } from 'app/service/selected-data';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MultiSelect } from 'primeng/components/multiselect/multiselect';


@Component({
    templateUrl: './peaks-overlap.html'
})
export class PeaksOverlapScreenComponent implements AfterViewInit, OnDestroy {
    errorMessage: string;
    experiments: FullExperiment[];
    segregated_data: Object;

    biosourcesItems: SelectItem[] = [];
    selectedMultiSelectBiosources: Object[] = [];

    selectedExperimentsSubscription: Subscription;
    projectSubscription: Subscription;
    activeTopStackSubscription: Subscription;
    epigeneticMarkSubscription: Subscription;

    defaultSelectBiosourcesLabel = 'Click here for selecting the BioSources';

    selectedExperimentsSource = new BehaviorSubject<IdName[]>([]);
    selectedExperimentsValue$: Observable<IdName[]> = this.selectedExperimentsSource.asObservable();

    selectedBioSourcesSource = new BehaviorSubject<IdName[]>([]);
    selectedBioSourcesValue$: Observable<IdName[]> = this.selectedBioSourcesSource.asObservable();

    currentlyProcessing: Object[] = [];

    current_request = 0;

    dataInfo: any = null;
    showDataDetail = false;


    @ViewChild('overlapbarchart', { static: true }) overlapbarchart: OverlapsBarChartComponent;
    @ViewChild('multiselect', { static: true }) multiselect: MultiSelect;


    constructor(public deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.loadExperiments();
    }

    ngAfterViewInit() {
        this.selectedExperimentsSubscription = this.selectedExperimentsValue$.debounceTime(250).subscribe(() => this.processOverlaps());
        this.activeTopStackSubscription = this.selectedData.activeTopStackValue$.subscribe((dataStackItem) => this.processOverlaps());
        this.projectSubscription = this.deepBlueService.projectsValue$.subscribe(() => this.loadExperiments());
    }

    ngOnDestroy() {
        this.selectedExperimentsSubscription.unsubscribe();
        this.projectSubscription.unsubscribe();
        this.activeTopStackSubscription.unsubscribe();
        this.epigeneticMarkSubscription.unsubscribe();
    }

    loadExperiments() {
        if (this.epigeneticMarkSubscription && !this.epigeneticMarkSubscription.closed) {
            this.epigeneticMarkSubscription.unsubscribe();
        }

        this.epigeneticMarkSubscription = this.deepBlueService.epigeneticMarkValue$.subscribe(selected_epigenetic_mark => {
            this.deepBlueService.getExperiments(this.deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(experiments_ids => {
                const ids = experiments_ids.map((e) => e.id.id);
                this.deepBlueService.getExperimentsInfos(ids).subscribe(full_info => {
                    this.experiments = <FullExperiment[]>full_info;
                    this.segregated_data = this.segregate(<FullExperiment[]>full_info);
                });
            },
                error => this.errorMessage = <any>error);
        });
    }

    segregate(experiments: FullExperiment[]) {

        let projectNames = this.deepBlueService.projectsSource.getValue().map((project) => project.name);

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

            if (projectNames.indexOf(experiment_project) < 0) {
                continue;
            }

            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = [];
                const l = {
                    label: experiment_biosource,
                    norm_label: experiment_biosource.toLowerCase().replace(/[\W_]+/g, ""),
                    value: { name: experiment_biosource, experiments: biosources[experiment_biosource] }
                };
                this.biosourcesItems.push(l);

                if (pre_selected_biosources.map((bs) => bs.toLowerCase().replace(/[\W_]+/g, "")).indexOf(l.norm_label) > -1) {
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

        this.biosourcesItems.sort((a, b) => a.label.localeCompare(b.label));
        this.selectBiosources({ value: event_items });

        return {
            'biosources': biosources,
            'samples': samples,
            'epigenetic_marks': epigenetic_marks,
            'techniques': techniques,
            'projects': projects
        };
    }

    selectBiosources(event: any) {
        this.requestManager.cancelAllRequest();

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

        const current = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCountOverlaps(current, experiments).subscribe((request: DeepBlueMiddlewareRequest) => {
            this.requestManager.cancelAllRequest();
            this.requestManager.enqueueRequest(request);
            this.deepBlueService.getComposedResultIterator(request, 'overlaps', this.reloadPlot, this)
                .subscribe((result: DeepBlueResult[]) => {
                    const end = new Date().getTime();
                    this.currentlyProcessing = [];
                    this.reloadPlot(this, result);
                });
        });
    }

    reloadPlot(_self: PeaksOverlapScreenComponent, datum: DeepBlueResult[]) {
        if (!datum) {
            return;
        }
        const categories: string[] = [];

        const value_by_stack_biosource: Array<
            {
                [key: string]: DeepBlueResult[]
            }> = [];

        const result_by_dataset_stack: {
            [key: string]: {
                [key: string]: DeepBlueResult[]
            }
        } = {};

        for (const result of datum) {
            const stack_number = _self.selectedData.getStackPosByQueryId(result.getData().id());
            const experiment = _self.experiments.find((se: FullExperiment) => {
                if (se.name === result.getFilter().name()) {
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
                        const count = result.resultAsCount();
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

    setDataInfo($event: any) {
        this.dataInfo = $event;
        this.showDataDetail = true;
    }

    dataSelected() {
        this.showDataDetail = false;
    }
}
