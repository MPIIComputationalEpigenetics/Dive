
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { IdName, EpigeneticMark, Experiment, Genome, Annotation } from '../domain/deepblue';
import { DeepBlueOperation, StackValue } from '../domain/operations';

import { DeepBlueService } from '../service/deepblue';
import { ProgressElement } from '../service/progresselement'

@Injectable()
export class DataStackFactory {
    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement,
        private router: Router) { }

    public newDataStack(): DataStack {
        return new DataStack(this.deepBlueService, this.progress_element, this.router);
    }
}

export class DataStackItem {
    constructor(public op: DeepBlueOperation, public what: string, public description: string, public count: number) { }

    clone(): DataStackItem {
        return new DataStackItem(this.op, this.what, this.description, this.count);
    }
}

export class DataStack {

    _data: DataStackItem[] = [];

    public topStackSubject = new Subject<DataStackItem>();
    public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement,
        private router: Router) { }

    setInitialData(data: IdName) {
        this._data = [];
        if (data.id == "" || data.id == null) {
            return;
        }

        let request_count = 0;
        this.progress_element.reset(4, request_count);

        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.selectAnnotation(data, this.progress_element, request_count).subscribe((selected_annotation) => {
            this.deepBlueService.cacheQuery(selected_annotation, this.progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "select", "Selection", totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            })
        });
    }

    setInitialDataArray(data: DataStackItem[]) {
        this._data = data;
    }

    overlap(operation: DeepBlueOperation) {
        let current_op: DeepBlueOperation = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }

        let request_count = 0;
        this.progress_element.reset(5, request_count);

        this.deepBlueService.overlap(current_op, operation, "true", this.progress_element, request_count).subscribe((overlap_operation) => {
            this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "overlap",
                        "Overlap with " + operation.data.name + " overlapping with XXX",
                        totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            })
        });
    }

    non_overlap(operation: DeepBlueOperation) {
        // TODO: use/make a generic method for experiments and annotations
        let current_op: DeepBlueOperation = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }

        let request_count = 0;
        this.progress_element.reset(5, request_count);

        this.deepBlueService.overlap(current_op, operation, "false", this.progress_element, request_count).subscribe((overlap_operation) => {
            this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "not-overlap",
                        "Not-overlap with " + operation.data.name + " overlapping with XXX",
                        totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            })
        });
    }

    filter_regions(field: string, operation: string, value: string, type: string) {
        let request_count = 0;
        this.progress_element.reset(4, request_count);

        let current_op: DeepBlueOperation = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        this.deepBlueService.filter_region(current_op, field, operation, value, type, this.progress_element, request_count).subscribe((filter_operation) => {
            this.deepBlueService.cacheQuery(filter_operation, this.progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                    let totalSelectedRegtions = total["result"]["count"];
                    let text = field;
                    if (text == "@LENGTH") {
                        text = "length";
                    }
                    let dataStackItem: DataStackItem = new DataStackItem(cached_data, "filter", text + " " + operation + " " + value, totalSelectedRegtions);
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

    cloneStackItems(): DataStackItem[] {
        let newStack: DataStackItem[] = [];
        for (let item of this._data) {
            newStack.push(item);
        }
        return newStack;
    }
}
