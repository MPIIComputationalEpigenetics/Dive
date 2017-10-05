import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { IdName, EpigeneticMark, Experiment, Genome, Annotation } from 'app/domain/deepblue';
import { DeepBlueOperation, StackValue } from 'app/domain/operations';

import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';
import { IOperation } from 'app/domain/interfaces';

declare var randomColor: any;

@Injectable()
export class DataStackFactory {
    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement,
        private router: Router) { }

    public newDataStack(): DataStack {
        return new DataStack(this.deepBlueService, this.progress_element, this.router);
    }
}

export class DataStackItem {
    constructor(public op: IOperation, public what: string, public description: string, public count: number) { }

    clone(): DataStackItem {
        return new DataStackItem(this.op, this.what, this.description, this.count);
    }
}

export class DataStack {

    public color = 'blue';
    public color_array: any;
    _data: DataStackItem[] = [];

    public topStackSubject = new Subject<DataStackItem>();
    public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement,
        private router: Router) {
        this.color_array = randomColor({ format: 'rgbArray', luminosity: 'dark' });
        this.color = 'rgba(' + this.color_array[0] + ',' + this.color_array[1] + ',' + this.color_array[2] + ',1)';
    }

    getColor(alpha: string) {
        return 'rgba(' + this.color_array[0] + ',' + this.color_array[1] + ',' + this.color_array[2] + ',' + alpha + ')';
    }

    setInitialData(data: IOperation) {
        this._data = [];
        if (data == null) {
            return;
        }

        const request_count = 0;
        this.progress_element.reset(4, request_count);

        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.cacheQuery(data, this.progress_element, request_count).subscribe((cached_data) => {
            this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                const totalSelectedRegtions = total['result']['count'];
                const dataStackItem: DataStackItem = new DataStackItem(cached_data, 'select', 'Selection', totalSelectedRegtions);
                this._data.push(dataStackItem);
                this.topStackSubject.next(dataStackItem);
            });
        });
    }

    setInitialDataArray(data: DataStackItem[]) {
        this._data = data;
    }

    overlap(operation: DeepBlueOperation) {
        const current_op: IOperation = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }

        const request_count = 0;
        this.progress_element.reset(5, request_count);

        this.deepBlueService.overlap(current_op, operation, 'true', this.progress_element, request_count).subscribe((overlap_operation) => {
            this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
                this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                    const totalSelectedRegtions = total['result']['count'];
                    const dataStackItem: DataStackItem = new DataStackItem(cached_data, 'overlap',
                        'Overlap with ' + operation.data().name() + ' overlapping with XXX',
                        totalSelectedRegtions);
                    this._data.push(dataStackItem);
                    this.topStackSubject.next(dataStackItem);
                });
            });
        });
    }

    non_overlap(operation: DeepBlueOperation) {
        // TODO: use/make a generic method for experiments and annotations
        const current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }

        const request_count = 0;
        this.progress_element.reset(5, request_count);

        this.deepBlueService.overlap(current_op, operation, 'false', this.progress_element, request_count)
            .subscribe((overlap_operation) => {
                this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
                    this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                        const totalSelectedRegtions = total['result']['count'];
                        const dataStackItem: DataStackItem = new DataStackItem(cached_data, 'not-overlap',
                            'Not-overlap with ' + operation.data().name() + ' overlapping with XXX',
                            totalSelectedRegtions);
                        this._data.push(dataStackItem);
                        this.topStackSubject.next(dataStackItem);
                    });
                });
            });
    }

    filter_regions(field: string, operation: string, value: string, type: string) {
        const request_count = 0;
        this.progress_element.reset(4, request_count);

        const current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        this.deepBlueService.filter_region(current_op, field, operation, value, type, this.progress_element, request_count)
            .subscribe((filter_operation) => {
                this.deepBlueService.cacheQuery(filter_operation, this.progress_element, request_count).subscribe((cached_data) => {
                    this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
                        const totalSelectedRegtions = total['result']['count'];
                        let text = field;
                        if (text === '@LENGTH') {
                            text = 'length';
                        }
                        const dataStackItem: DataStackItem =
                            new DataStackItem(cached_data, 'filter', text + ' ' + operation + ' ' + value, totalSelectedRegtions);
                        this._data.push(dataStackItem);
                        this.topStackSubject.next(dataStackItem);
                    });
                });
            });

    }

    remove(data: DataStackItem) {
        const query_id = data.op.queryId().id;
        // find position
        let i = this._data.length - 1;
        for (; i >= 0; i--) {
            if (this._data[i].op.queryId().id === query_id) {
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

    getCurrentOperation(): IOperation {
        if (this._data.length > 0) {
            return this._data[this._data.length - 1].op;
        }
        return null;
    }

    cloneStackItems(): DataStackItem[] {
        const newStack: DataStackItem[] = [];
        for (const item of this._data) {
            newStack.push(item);
        }
        return newStack;
    }

    name(): string {
        const top = this._data[0];
        if (top === undefined) {
            return '(loading..)';
        }
        if (this._data.length > 1) {
            return top.op.data().name() + ' (filtered)';
        } else {
            return top.op.data().name();
        }
    }
}
