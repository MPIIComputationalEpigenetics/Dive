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
import { DataStackItem } from 'app/data-structures/data-stack/data-stack-item';
import { DataStackItems } from 'app/data-structures/data-stack/data-stack-items';

declare var randomColor: any;


export class DataStack {

  public color: string;

  public color_array: any = {
    r: 0,
    g: 0,
    b: 0
  };

  _data: DataStackItems = new DataStackItems();

  total_requests = 0;

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

    const request_count = ++this.total_requests;

    this.progress_element.reset(4, request_count);

    // TODO: use/make a generic method for experiments and annotations
    this.deepBlueService.cacheQuery(data, request_count).subscribe((cached_data) => {
      this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
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
      this.deepBlueService.countRegionsRequest(data).subscribe((total) => {
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

    const request_count = ++this.total_requests;

    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.overlap(current_op, operation, true).subscribe((overlap_operation) => {
      this.deepBlueService.cacheQuery(overlap_operation, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
          const totalSelectedRegtions = total.resultAsCount();
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

    const request_count = ++this.total_requests;

    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.overlap(current_op, operation, false, request_count).subscribe((overlap_operation) => {
      this.deepBlueService.cacheQuery(overlap_operation, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
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

    const request_count = ++this.total_requests;

    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.flank(current_op, start, length, request_count).subscribe((flank_operation) => {
      this.deepBlueService.cacheQuery(flank_operation, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
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

    const request_count = ++this.total_requests;

    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.extend(current_op, length, direction, request_count).subscribe((extend_operation) => {
      this.deepBlueService.cacheQuery(extend_operation, request_count).subscribe((cached_data) => {
        this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
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

    const request_count = ++this.total_requests;

    this.progress_element.reset(5, request_count);

    this.requestManager.cancelAllRequest();

    this.deepBlueService.selectGoTerm(term, gene_model, request_count).subscribe((go_selected) => {
      this.overlap(go_selected)
    });
  }

  filter_regions(field: string, operation: string, value: string, type: string) {
    const request_count = ++this.total_requests;

    this.progress_element.reset(4, request_count);

    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    this.requestManager.cancelAllRequest();

    this.deepBlueService.filter_region(current_op, field, operation, value, type, request_count)
      .subscribe((filter_operation) => {
        this.deepBlueService.cacheQuery(filter_operation, request_count).subscribe((cached_data) => {
          this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
            const totalSelectedRegtions = total.resultAsCount();
            const dataStackItem: DataStackItem =
              new DataStackItem(cached_data, totalSelectedRegtions);
            this._data.push(dataStackItem);
          });
        });
      });

  }

  filter_by_dna_motif(pattern: string) {
    const request_count = ++this.total_requests;

    this.progress_element.reset(4, request_count);

    const current_op = this.getCurrentOperation();
    if (current_op == null) {
      return;
    }

    this.requestManager.cancelAllRequest();
    this.deepBlueService.filter_by_motif(current_op, pattern, request_count)
      .subscribe((filter_operation) => {
        this.deepBlueService.cacheQuery(filter_operation, request_count).subscribe((cached_data) => {
          this.deepBlueService.countRegionsRequest(cached_data, request_count).subscribe((total) => {
            const totalSelectedRegtions = total.resultAsCount();
            const dataStackItem: DataStackItem =
              new DataStackItem(cached_data, totalSelectedRegtions);
            this._data.push(dataStackItem);
          });
        });
      });

  }

  // TODO: return an event and let the caller routes back
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
