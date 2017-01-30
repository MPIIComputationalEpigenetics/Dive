import {
    IdName,
    EpigeneticMark,
    Experiment,
    Genome,
    Annotation,
    ProgressElement
} from '../domain/deepblue';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { DeepBlueService } from '../service/deepblue';

import { Observable } from 'rxjs/Observable'

import { Subscription } from 'rxjs/Subscription';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Subject } from 'rxjs/Subject'

import { DeepBlueOperation } from '../domain/operations'



export class DataStackItem {
    constructor(public op: DeepBlueOperation, public what: string, public count: number) { }
}

@Injectable()
export class DataStack {

    _data: DataStackItem[] = [];
    epigeneticMarkSubscription: Subscription;

    public topStackSubject = new Subject<DataStackItem>();

    public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

    router: Router;

    constructor(private _router: Router, private deepBlueService: DeepBlueService) {
        this.router = _router;
        this.epigeneticMarkSubscription = deepBlueService.annotationValue$.subscribe((annotation: Annotation) => {
            this.init(annotation);
        });


    }

    init(data: IdName): Observable<IdName> {
        this._data = [];

        if (data.id == "" || data.id == null) {
            return;
        }

        let progress_element: ProgressElement = new ProgressElement();
        let request_count = 0;
        progress_element.reset(4, request_count);

        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.selectAnnotation(data, progress_element, request_count).subscribe((selected_annotation) => {
            this.deepBlueService.cacheQuery(selected_annotation, progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "Selection", totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            })
        });
    }

    overlap(data: IdName, progress_element: ProgressElement) {
        let request_count = 0;
        progress_element.reset(5, request_count);

        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.selectExperiment(data, progress_element, request_count).subscribe((selected_experiment) => {
            let current_op: DeepBlueOperation = this.getCurrentOperation();
            if (current_op == null) {
                return;
            }
            this.deepBlueService.overlap(current_op, selected_experiment, "true", progress_element, request_count).subscribe((overlap_operation) => {
                this.deepBlueService.cacheQuery(overlap_operation, progress_element, request_count).subscribe((cached_data) => {
                    this.deepBlueService.countRegionsRequest(cached_data, progress_element, request_count).subscribe((total) => {
                        let totalSelectedRegtions = total["result"]["count"];
                        let dataStackItem: DataStackItem = new DataStackItem(cached_data, "Overlap with", totalSelectedRegtions);
                        this._data.push(dataStackItem);
                        this.topStackSubject.next(dataStackItem);
                    });
                })
            })
        });
    }

    non_overlap(data: IdName, progress_element: ProgressElement) {
        let request_count = 0;
        progress_element.reset(5, request_count);

        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.selectExperiment(data, progress_element, request_count).subscribe((selected_experiment) => {
            let current_op: DeepBlueOperation = this.getCurrentOperation();
            if (current_op == null) {
                return;
            }
            this.deepBlueService.overlap(current_op, selected_experiment, "false", progress_element, request_count).subscribe((overlap_operation) => {
                this.deepBlueService.cacheQuery(overlap_operation, progress_element, request_count).subscribe((cached_data) => {
                    this.deepBlueService.countRegionsRequest(cached_data, progress_element, request_count).subscribe((total) => {
                        let totalSelectedRegtions = total["result"]["count"];
                        let dataStackItem: DataStackItem = new DataStackItem(cached_data, "Not-overlap with", totalSelectedRegtions);
                        this._data.push(dataStackItem);
                        this.topStackSubject.next(dataStackItem);
                    });
                })
            })
        });
    }

    filter_regions(field: string, operation: string, value: string, type: string, progress_element: ProgressElement) {
        let request_count = 0;
        progress_element.reset(4, request_count);


        let current_op: DeepBlueOperation = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        this.deepBlueService.filter_region (current_op, field, operation, value, type, progress_element, request_count).subscribe((filter_operation) => {
            this.deepBlueService.cacheQuery(filter_operation, progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "Not-overlap with", totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            })
        })

    }

    remove(data: DataStackItem) {
        let query_id = data.op.query_id;
        // find position
        let i = this._data.length - 1;
        for (; i >= 0; i--) {
            if (this._data[i].op.query_id == query_id) {
                break;
            }
        }

        this._data = this._data.slice(0, i);
        if (this._data.length > 0) {
            this.topStackSubject.next(this._data[this._data.length - 1]);
        } else {
            this.topStackSubject.next();
            this.router.navigate(['/']);
        }
    }

    getData(): DataStackItem[] {
        return this._data;
    }

    getCurrentOperation(): DeepBlueOperation {
        if (this._data.length > 0) {
            return this._data[this._data.length - 1].op;
        }
        return null;
    }
}
