import {
    IdName,
    EpigeneticMark,
    Experiment,
    Genome,
    Annotation,
    ProgressElement
} from '../domain/deepblue';

import { Injectable } from '@angular/core';

import { DeepBlueService } from '../service/deepblue';

import { Observable } from 'rxjs/Observable'

import { Subscription } from 'rxjs/Subscription';

import { Subject } from 'rxjs/Subject'

import { DeepBlueOperation } from '../domain/operations'


export class DataStackItem {
    constructor(public op: DeepBlueOperation, public what: string, public count: number) { }
}

@Injectable()
export class DataStack {

    epigeneticMarkSubscription: Subscription;
    _data: DataStackItem[] = [];

    constructor(private deepBlueService: DeepBlueService) { 

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
            this.deepBlueService.overlap(this.getCurrentOperation(), selected_experiment, progress_element, request_count).subscribe((overlap_operatio) => {
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
