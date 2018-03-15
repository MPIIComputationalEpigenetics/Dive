import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { IdName, EpigeneticMark, Experiment, Genome, Annotation, GeneModel } from 'app/domain/deepblue';
import { DeepBlueOperation, StackValue } from 'app/domain/operations';

import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';
import { IOperation, IDataParameter } from 'app/domain/interfaces';
import { RequestManager } from 'app/service/requests-manager';

declare var randomColor: any;

@Injectable()
export class DataStackFactory {
  constructor(private deepBlueService: DeepBlueService, private requestManager: RequestManager,
    private progress_element: ProgressElement, private router: Router) { }

  public newDataStack(): DataStack {
    return new DataStack(this.deepBlueService, this.requestManager, this.progress_element, this.router);
  }
}

export class DataStackItem {
  constructor(public op: IOperation, public count: number) { }

  clone(): DataStackItem {
    return new DataStackItem(this.op, this.count);
  }
}


export class DataStackItems {
  _data: DataStackItem[] = [];

  public topStackSubject = new BehaviorSubject<DataStackItem>(null);
  public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

  public stackSubject = new BehaviorSubject<DataStackItem[]>(null);
  public stackValue$: Observable<DataStackItem[]> = this.stackSubject.asObservable();

  public DataStackItems() {
    this._data = [];
  }

  init(data?: DataStackItem[]) {
    if (data) {
      this._data = data;
    } else {
      this._data = [];
    }
  }

  getInitialOperation(): IOperation {
    if (this._data.length > 0) {
      return this._data[0].op;
    }
    return null;
  }

  getCurrentOperation(): IOperation {
    if (this._data.length > 0) {
      return this._data[this._data.length - 1].op;
    }
    return null;
  }

  push(item: DataStackItem) {
    this._data.push(item);
    this.topStackSubject.next(item);
    this.stackSubject.next(this._data);
  }

  unshift(item: DataStackItem) {
    this._data.unshift(item);
    this.stackSubject.next(this._data);
  }

  // Return true if the stack is empty
  remove(data: DataStackItem): boolean {
    const query_id = data.op.id().id;
    // find position
    let i = this._data.length - 1;
    for (; i >= 0; i--) {
      if (this._data[i].op.id().id === query_id) {
        break;
      }
    }

    this._data = this._data.slice(0, i);
    if (this._data.length > 0) {
      this.topStackSubject.next(this._data[this._data.length - 1]);
      this.stackSubject.next(this._data);
      return false;
    } else {
      this.topStackSubject.next(null);
      this.stackSubject.next(this._data);
      return true;
    }
  }

  clone(): DataStackItem[] {
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

export class DataStack {

  public color: string;

  public color_array: any = {
    r: 0,
    g: 0,
    b: 0
  };

  _data: DataStackItems = new DataStackItems();

  constructor(private deepBlueService: DeepBlueService, private requestManager: RequestManager,
    private progress_element: ProgressElement, private router: Router) {
    let random_color = randomColor({ format: 'rgbArray', luminosity: 'dark' });
    this.color_array = {
      r: random_color[0],
      g: random_color[1],
      b: random_color[2]
    }
    this.color = 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ', 1)';
  }

  getColor(alpha?: string) {
    if (alpha) {
      return 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ',' + alpha + ')';
    }
    return 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ',' + 1 + ')';
  }

  onColorChange($color: any) {
    this.color = 'rgba(' + $color.r + ',' + $color.g + ',' + $color.b + ', 1)';
  }

  setInitialData(data: IOperation) {
    this._data.init();
    if (data == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(4, request_count);

    // TODO: use/make a generic method for experiments and annotations
    this.deepBlueService.cacheQuery(data, this.progress_element, request_count).subscribe((cached_data) => {
      this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
        const totalSelectedRegtions = total.resultAsCount();
        const dataStackItem: DataStackItem = new DataStackItem(cached_data, totalSelectedRegtions);
        this._data.push(dataStackItem);
        this.stackOperations(data.data());
      });
    });
  }

  stackOperations(data: IDataParameter): Observable<IDataParameter> {

    if (!(data instanceof DeepBlueOperation)) {
      return;
    } else {
      this.deepBlueService.countRegionsRequest(data, this.progress_element, -1).subscribe((total) => {
        const totalSelectedRegtions = total.resultAsCount();
        const dataStackItem: DataStackItem = new DataStackItem(data, totalSelectedRegtions);
        this._data.unshift(dataStackItem);
        this.stackOperations(data.data());
      });
    }
  }

  setInitialDataArray(data: DataStackItem[]) {
    this._data.init(data);
  }

  overlap(operation: IOperation) {
    const current_op: IOperation = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.overlap(current_op, operation, true, this.progress_element, request_count).subscribe((overlap_operation) => {
      this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
          const totalSelectedRegtions = total.resultAsCount();
          debugger;
          const dataStackItem: DataStackItem = new DataStackItem(cached_data, totalSelectedRegtions);
          this._data.push(dataStackItem);
        });
      });
    });
  }

  non_overlap(operation: IOperation) {
    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.overlap(current_op, operation, false, this.progress_element, request_count).subscribe((overlap_operation) => {
      this.deepBlueService.cacheQuery(overlap_operation, this.progress_element, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
          const totalSelectedRegtions = total.resultAsCount();
          const dataStackItem: DataStackItem = new DataStackItem(cached_data, totalSelectedRegtions);
          this._data.push(dataStackItem);
        });
      });
    });
  }

  flank(start: number, length: number) {
    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.flank(current_op, start, length, this.progress_element, request_count).subscribe((flank_operation) => {
      this.deepBlueService.cacheQuery(flank_operation, this.progress_element, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
          const totalSelectedRegtions = total.resultAsCount();
          const dataStackItem: DataStackItem = new DataStackItem(cached_data, totalSelectedRegtions);
          this._data.push(dataStackItem);
        });
      });
    });
  }

  extend(length: number, direction: string) {
    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.extend(current_op, length, direction, this.progress_element, request_count).subscribe((extend_operation) => {
      this.deepBlueService.cacheQuery(extend_operation, this.progress_element, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
          const totalSelectedRegtions = total.resultAsCount();
          const dataStackItem: DataStackItem = new DataStackItem(cached_data, totalSelectedRegtions);
          this._data.push(dataStackItem);
        });
      });
    });
  }

  overlapGoTerm(term: string, gene_model: GeneModel): any {
    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    const request_count = 0;
    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.selectGoTerm(term, gene_model, this.progress_element, request_count).subscribe((go_selected) => {
      debugger;
      this.overlap(go_selected)
    });
  }

  filter_regions(field: string, operation: string, value: string, type: string) {
    const request_count = 0;
    this.progress_element.reset(4, request_count);

    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    this.requestManager.cancelAllRequest();

    this.deepBlueService.filter_region(current_op, field, operation, value, type, this.progress_element, request_count)
      .subscribe((filter_operation) => {
        this.deepBlueService.cacheQuery(filter_operation, this.progress_element, request_count).subscribe((cached_data) => {
          this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
            const totalSelectedRegtions = total.resultAsCount();
            const dataStackItem: DataStackItem =
              new DataStackItem(cached_data, totalSelectedRegtions);
            this._data.push(dataStackItem);
          });
        });
      });

  }

  filter_by_dna_motif(pattern: string) {
    const request_count = 0;
    this.progress_element.reset(4, request_count);

    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    this.requestManager.cancelAllRequest();
    this.deepBlueService.filter_by_motif(current_op, pattern, this.progress_element, request_count)
      .subscribe((filter_operation) => {
        this.deepBlueService.cacheQuery(filter_operation, this.progress_element, request_count).subscribe((cached_data) => {
          this.deepBlueService.countRegionsRequest(cached_data, this.progress_element, request_count).subscribe((total) => {
            const totalSelectedRegtions = total.resultAsCount();
            const dataStackItem: DataStackItem =
              new DataStackItem(cached_data, totalSelectedRegtions);
            this._data.push(dataStackItem);
          });
        });
      });

  }


  remove(data: DataStackItem) {
    if (this._data.remove(data)) {
      this.router.navigate(['/']);
    }
  }

  getData(): DataStackItem[] {
    return this._data._data;
  }

  getInitialOperation(): IOperation {
    return this._data.getInitialOperation();
  }

  getCurrentOperation(): IOperation {
    return this._data.getCurrentOperation();
  }

  getTopStackValueObserver(): Observable<DataStackItem> {
    return this._data.topStackValue$
  }

  getStackValueObserver(): Observable<DataStackItem[]> {
    return this._data.stackValue$;
  }

  cloneStackItems(): DataStackItem[] {
    return this._data.clone();
  }

  name(): string {
    return this._data.name();
  }
}
