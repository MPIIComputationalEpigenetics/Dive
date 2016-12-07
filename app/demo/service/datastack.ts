import {
    IdName,
    EpigeneticMark,
    Experiment,
    Genome,
    Annotation,
    ProgressElement
} from '../domain/deepblue';

import { DeepBlueService } from '../service/deepblue';

import { Observable } from 'rxjs/Observable'

import { Subject } from 'rxjs/Subject'

import { DeepBlueOperation } from '../domain/operation'


export class DataStackItem {
    constructor(public op: DeepBlueOperation, public what: string, public count: number) { }
}

export class DataStack {

    _data: DataStackItem[] = [];

    constructor(private deepBlueService: DeepBlueService) { }

    init(data: IdName): Observable<IdName> {
        this._data = [];

        let progress_element: ProgressElement = new ProgressElement();
        let request_count = 0;
        progress_element.reset(4, request_count);

        let source = new Subject<IdName>();

        // TODO: use/make a generic method for experiments and annotations                
        this.deepBlueService.selectAnnotation(data, progress_element, request_count).subscribe((selected_annotation) => {
            this.deepBlueService.cacheQuery(selected_annotation, progress_element, request_count).subscribe((cached_data) => {
                let dbo: DeepBlueOperation = new DeepBlueOperation(data, cached_data.query_id, "select_annotation", 0);
                this.deepBlueService.countRegionsRequest(dbo, progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(dbo, "Selection", totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    source.next(data);
                    source.complete();
                });
            })
        });

        return source.asObservable();
    }

    overlap(data: IdName): Observable<IdName> {
        let progress_element: ProgressElement = new ProgressElement();
        let request_count = 0;
        progress_element.reset(4, request_count);

        let source = new Subject<IdName>();

        // TODO: use/make a generic method for experiments and annotations 
        this.deepBlueService.selectExperiment(data, progress_element, request_count).subscribe((selected_experiment) => {
            this.deepBlueService.overlap(this.getCurrent().op.query_id, selected_experiment, progress_element, request_count).subscribe((overlap_operatio) => {
                this.deepBlueService.cacheQuery(selected_experiment, progress_element, request_count).subscribe((cached_data) => {
                    let dbo: DeepBlueOperation = new DeepBlueOperation(data, cached_data.query_id, "select_experiment", 0);
                    this.deepBlueService.countRegionsRequest(dbo, progress_element, request_count).subscribe((total) => {
                        let totalSelectedRegtions = total["result"]["count"];
                        let dataStackItem: DataStackItem = new DataStackItem(dbo, "Overlap", totalSelectedRegtions);
                        this._data.push(dataStackItem);
                        source.next(data);
                        source.complete();
                    });
                })
            })
        });

        return source.asObservable();

    }

    remove(data: IdName) {
        // TODO :)
    }

    getData(): DataStackItem[] {
        return this._data;
    }

    getCurrentOperation(): DeepBlueOperation {
        return this._data[this._data.length - 1].op;
    }
}