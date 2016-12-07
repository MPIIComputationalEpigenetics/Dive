import { Injectable } from '@angular/core';
import {
    Http,
    Response,
    URLSearchParams
} from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable'

import { Subject } from 'rxjs/Subject'

import {
    IdName,
    EpigeneticMark,
    Experiment,
    Genome,
    Annotation,
    ProgressElement
} from '../domain/deepblue';

import {
    DeepBlueOperation,
    DeepBlueRequest, 
    DeepBlueResult
} from '../domain/operations'


@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'api';

    // Observable string sources
    public genomeSource = new BehaviorSubject<Genome>({ id: "", name: "", extra_metadata: null });
    public annotationSource = new BehaviorSubject<Annotation>({ id: "", name: "", extra_metadata: null });
    public epigeneticMarkSource = new BehaviorSubject<EpigeneticMark>({ id: "", name: "", extra_metadata: null });
    public dataInfoSelectedSource = new BehaviorSubject<IdName>(null);

    // Observable string streams
    genomeValue$: Observable<Genome> = this.genomeSource.asObservable();
    annotationValue$: Observable<Annotation> = this.annotationSource.asObservable();
    epigeneticMarkValue$: Observable<EpigeneticMark> = this.epigeneticMarkSource.asObservable();
    dataInfoSelectedValue$: Observable<IdName> = this.dataInfoSelectedSource.asObservable();

    setDataInfoSelected(data: IdName) {
        this.dataInfoSelectedSource.next(data);
    }

    getDataInfoSelected(): IdName {
        return this.dataInfoSelectedSource.getValue();
    }

    // Service messages
    setGenome(genome: Genome) {
        this.genomeSource.next(genome);
    }

    /* Define the annotation that we are going to dive */
    setAnnotation(annotation: Annotation) {
        this.annotationSource.next(annotation);
    }

    setEpigeneticMark(epigeneticMark: EpigeneticMark) {
        this.epigeneticMarkSource.next(epigeneticMark);
    }

    getGenome(): Genome {
        return this.genomeSource.getValue();
    }

    getAnnotation(): Annotation {
        return this.annotationSource.getValue();
    }


    getEpigeneticMark(): EpigeneticMark {
        return this.epigeneticMarkSource.getValue();
    }

    // 

    constructor(private http: Http) { }

    // Functions to select data from the Server


    getHistones(): Observable<EpigeneticMark[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', this.getGenome().name);
        params.set('controlled_vocabulary', "epigenetic_marks");
        params.set('type', "peaks");
        return this.http.get(this.deepBlueUrl + "/collection_experiments_count", { "search": params })
            .map(this.extractHistone)
            .catch(this.handleError);
    }

    private extractHistone(res: Response) {
        let body = res.json();
        let data = body[1] || [];
        let regexp = new RegExp("h([134]|2[ab])([a-z])([0-9]+)(.*)");

        data = data.filter((em) => {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort((em1, em2) => {
            return em1[1].localeCompare(em2[1]);
        });;

        return data.map((value) => {
            return (new EpigeneticMark(value));
        });
    } que

    getGenomes(): Observable<Genome[]> {
        return this.http.get(this.deepBlueUrl + "/list_genomes")
            .map(this.extractGenomes)
            .catch(this.handleError);
    }

    private extractGenomes(res: Response) {
        let body = res.json();
        let data = body[1] || [];
        return data.map((value) => {
            return new Genome(value);
        });
    }

    getAnnotations(genome): Observable<Annotation[]> {
        if (!genome) {
            return Observable.empty<Annotation[]>();
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', genome.name);
        return this.http.get(this.deepBlueUrl + "/list_annotations", { "search": params })
            .map(this.extractAnnotation)
            .catch(this.handleError);
    }

    private extractAnnotation(res: Response) {
        let body = res.json();
        let data = body[1] || [];
        return data.map((value) => {
            return new Annotation(value);
        });
    }

    getExperiments(genome: Genome, epigenetic_mark: EpigeneticMark): Observable<IdName[]> {
        if (!genome) {
            return Observable.empty<IdName[]>();
        }

        if (!epigenetic_mark) {
            return Observable.empty<IdName[]>();
        }

        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', genome.name);
        params.set('type', "peaks");
        params.set('epigenetic_mark', epigenetic_mark.name);
        return this.http.get(this.deepBlueUrl + "/list_experiments", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                let data = body[1] || [];
                return data.map((value) => {
                    return new Experiment(value);
                });
            })
            .catch(this.handleError);
    }


    selectAnnotation(annotation: IdName, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!annotation) {
            return Observable.empty<DeepBlueOperation>();
        }

        let params: URLSearchParams = new URLSearchParams();
        params.set("annotation_name", annotation.name);
        params.set("genome", this.getGenome().name);
        return this.http.get(this.deepBlueUrl + "/select_annotations", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                let response: string = body[1] || "";
                progress_element.increment(request_count);
                return new DeepBlueOperation(annotation, response, "select_annotation", request_count);
            })
            .catch(this.handleError);
    }

    selectExperiment(experiment: IdName, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!experiment) {
            return Observable.empty<DeepBlueOperation>();
        }

        let params: URLSearchParams = new URLSearchParams();
        params.set("experiment_name", experiment.name);
        params.set("genome", this.getGenome().name);
        return this.http.get(this.deepBlueUrl + "/select_experiments", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                let response: string = body[1] || "";
                progress_element.increment(request_count);
                return new DeepBlueOperation(experiment, response, "select_experiment", request_count);
            })
            .catch(this.handleError);
    }

    selectMultipleExperiments(experiments: IdName[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation[]> {

        let observableBatch: Observable<DeepBlueOperation>[] = [];

        experiments.forEach((experiment, key) => {
            progress_element.increment(request_count);
            observableBatch.push(this.selectExperiment(experiment, progress_element, request_count));
        });

        return Observable.forkJoin(observableBatch);
    }


    overlapWithSelected(current: DeepBlueOperation, selected_data: DeepBlueOperation[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation[]> {

        let observableBatch: Observable<DeepBlueOperation>[] = [];

        selected_data.forEach((selected, key) => {
            let params: URLSearchParams = new URLSearchParams();
            params.set("query_data_id", current.query_id);
            params.set("query_filter_id", selected.query_id);
            let o: Observable<DeepBlueOperation> =
                this.http.get(this.deepBlueUrl + "/intersection", { "search": params })
                    .map((res: Response) => {
                        let body = res.json();
                        let response: string = body[1] || "";
                        progress_element.increment(request_count);
                        return new DeepBlueOperation(selected.data, response, "intersection", request_count);
                    })
                    .catch(this.handleError);

            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);
    }

    overlap(data_one: DeepBlueOperation, data_two: DeepBlueOperation, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {

        let params: URLSearchParams = new URLSearchParams();
        params.set("query_data_id", data_one.query_id);
        params.set("query_filter_id", data_two.query_id);
        return this.http.get(this.deepBlueUrl + "/intersection", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                let response: string = body[1] || "";
                progress_element.increment(request_count);
                return new DeepBlueOperation(data_one.data, response, "intersection", request_count);
            })
            .catch(this.handleError);
    }


    cacheQuery(selected_data: DeepBlueOperation, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!selected_data) {
            return Observable.empty<DeepBlueOperation>();
        }

        let params: URLSearchParams = new URLSearchParams();
        params.set("query_id", selected_data.query_id);
        params.set("cache", "true");
        return this.http.get(this.deepBlueUrl + "/query_cache", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                let response: string = body[1] || "";
                progress_element.increment(request_count);
                return selected_data.cacheIt(response);
            })
            .catch(this.handleError);
    }


    getResult(op_request: DeepBlueRequest, progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("request_id", op_request.request_id);

        let pollSubject = new Subject<DeepBlueResult>();

        let pollData = this.http.get(this.deepBlueUrl + "/get_request_data", { "search": params })
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                let status = body[0] || "error"
                if (status == "okay") {
                    progress_element.increment(request_count);
                    let op_result = new DeepBlueResult(op_request.data, body[1], request_count);
                    expand.unsubscribe();
                    pollSubject.next(op_result);
                    pollSubject.complete();
                }
            });

        let expand = pollData.expand(
            () => Observable.timer(250).concatMap(() => pollData)
        ).subscribe();

        return pollSubject.asObservable();

    }

    countRegionsRequest(op_exp: DeepBlueOperation, progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("query_id", op_exp.query_id);

        let request: Observable<DeepBlueResult> =
            this.http.get(this.deepBlueUrl + "/count_regions", { "search": params })
                .map((res: Response) => {
                    let body = res.json();
                    progress_element.increment(request_count);
                    return new DeepBlueRequest(op_exp.data, body[1] || "", request_count);
                })
                .flatMap((request_id) => {
                    return this.getResult(request_id, progress_element, request_count);
                })

        return request;
    }

    getResultBatch(op_requests: DeepBlueRequest[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult[]> {
        let observableBatch: Observable<DeepBlueResult>[] = [];

        op_requests.forEach((op_request, key) => {
            let o: Observable<DeepBlueResult> = this.getResult(op_request, progress_element, request_count);
            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    countRegionsBatch(query_ids: DeepBlueOperation[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult[]> {
        let observableBatch: Observable<DeepBlueResult>[] = [];

        query_ids.forEach((op_exp, key) => {
            let o: Observable<DeepBlueResult> = this.countRegionsRequest(op_exp, progress_element, request_count);

            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    private extractId(res: Response) {
        let body = res.json();
        return body[1] || "";
    }

    getInfos(ids: string[]): Observable<Object[]> {
        let params: URLSearchParams = new URLSearchParams();
        for (let id of ids) {
            params.append('id', id);
        }

        return this.http.get(this.deepBlueUrl + "/info", { "search": params })
            .map(this.extractExperiment)
            .catch(this.handleError);
    }

    private extractExperiment(res: Response): Object[] {
        let body = res.json();
        let data = body[1] || [];

        return data as Object[];
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${err.status} - ${err.statusText || ''} ${err}`
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    public includeFilter(data: IdName) {
        // this.dataStack.overlap(data);
    }
}
