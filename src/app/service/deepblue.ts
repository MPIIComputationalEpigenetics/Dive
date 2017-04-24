import { Injectable } from '@angular/core';

import { Http, Response, URLSearchParams } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    FullAnnotation,
    FullExperiment,
    FullGeneModel,
    FullMetadata,
    GeneModel,
    Genome,
    IdName
} from '../domain/deepblue';

import { IKey } from '../domain/interfaces';

import {
  DeepBlueMiddlewareOverlapResult,
  DeepBlueMultiParametersOperation,
  DeepBlueOperation,
  DeepBlueParametersOperation,
  DeepBlueRequest,
  DeepBlueResult,
  StackValue
} from '../domain/operations';

import { ProgressElement } from '../service/progresselement';

import { ICloneable } from '../domain/interfaces';


export class DataCache<T extends IKey, V extends ICloneable> {

    constructor(private _data: Map<string, V> = new Map()) { }

    put(key: T, value: V) {
        let cloneValue = value.clone(-1);
        this._data.set(key.key(), cloneValue);
        console.log(this._data);
    }

    get(key: T, request_count: number): V {
        let value: V = this._data.get(key.key());
        if (value) {
            console.log('cache hit', value);
            return value.clone(request_count);
        } else {
            return null;
        }
    }
}

export class MultiKeyDataCache<T extends IKey, V extends ICloneable> {

    constructor(private _data: Map<string, V> = new Map()) { }

    put(keys: T[], value: V) {
        let key_value = keys.map((k) => k.key()).join();
        let cloneValue = value.clone(-1);
        this._data.set(key_value, cloneValue);
        console.log(this._data);
    }

    get(keys: T[], request_count: number): V {
        let key_value = keys.map((k) => k.key()).join();
        let value: V = this._data.get(key_value);
        if (value) {
            console.log('multikey cache hit', value);
            return value.clone(request_count);
        } else {
            return null;
        }
    }
}

@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'api';

    // Observable string sources
    public genomeSource = new BehaviorSubject<Genome>(new Genome(['', '']));
    public annotationSource = new BehaviorSubject<Annotation>(new Annotation(['', '']));
    public epigeneticMarkSource = new BehaviorSubject<EpigeneticMark>(new EpigeneticMark(['', '']));
    public dataInfoSelectedSource = new BehaviorSubject<StackValue>(null);

    public selectedBioSources = new BehaviorSubject<BioSource[]>([]);

    // Observable string streams
    genomeValue$ = this.genomeSource.asObservable();
    annotationValue$ = this.annotationSource.asObservable();
    epigeneticMarkValue$ = this.epigeneticMarkSource.asObservable();
    dataInfoSelectedValue$ = this.dataInfoSelectedSource.asObservable();
    selectedBioSourcesValue$ = this.selectedBioSources.asObservable();

    idNamesQueryCache = new DataCache<IdName, DeepBlueOperation>();
    intersectsQueryCache = new MultiKeyDataCache<DeepBlueOperation, DeepBlueOperation>();
    overlapsQueryCache = new DataCache<IKey, DeepBlueOperation>();
    filtersQueryCache = new DataCache<IKey, DeepBlueOperation>();
    operationCache = new DataCache<DeepBlueOperation, DeepBlueOperation>();
    requestCache = new DataCache<DeepBlueOperation, DeepBlueRequest>();
    resultCache = new DataCache<DeepBlueRequest, DeepBlueResult>();

    setDataInfoSelected(stack_value: StackValue) {
        this.dataInfoSelectedSource.next(stack_value);
    }

    getDataInfoSelected(): StackValue {
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

    constructor(private http: Http, public progress_element: ProgressElement) {
        console.log('NEW DEEPBLUE SERVICE');
    }

    // Functions to select data from the Server


    getHistones(): Observable<EpigeneticMark[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', this.getGenome().name);
        params.set('controlled_vocabulary', 'epigenetic_marks');
        params.set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { 'search': params })
            .map(this.extractHistone)
            .catch(this.handleError);
    }

    getBioSources(): Observable<BioSource[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }
        const params: URLSearchParams = new URLSearchParams();
        params.set('genome', this.getGenome().name);
        params.set('controlled_vocabulary', 'biosources');
        params.set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { 'search': params })
            .map(this.extractBioSources)
            .catch(this.handleError);
    }

    private extractBioSources(res: Response) {
        let body = res.json();
        let data = body[1] || [];
        return data.map((value) => {
            return new BioSource(value);
        });
    }


    private extractHistone(res: Response) {
        let body = res.json();
        let data = body[1] || [];
        let regexp = new RegExp('h([134]|2[ab])([a-z])([0-9]+)(.*)');

        data = data.filter((em) => {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort((em1, em2) => {
            return em1[1].localeCompare(em2[1]);
        });;

        return data.map((value) => {
            return (new EpigeneticMark(value));
        });
    } que;

    getGenomes(): Observable<Genome[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('controlled_vocabulary', 'genomes');
        params.set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { 'search': params })
            .map(this.extractGenomes)
            .catch(this.handleError);
    }

    private extractGenomes(res: Response) {
        let body = res.json();
        const data = body[1] || [];
        return data.map((value) => {
            return new Genome(value);
        });
    }

    getAnnotations(genome): Observable<Annotation[]> {
        if (!genome) {
            return Observable.empty<Annotation[]>();
        }
        const params: URLSearchParams = new URLSearchParams();
        params.set('genome', genome.name);
        return this.http.get(this.deepBlueUrl + '/list_annotations', { 'search': params })
            .map(this.extractAnnotation)
            .catch(this.handleError);
    }

    private extractAnnotation(res: Response) {
        const body = res.json();
        const data = body[1] || [];
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
        params.set('type', 'peaks');
        params.set('epigenetic_mark', epigenetic_mark.name);
        return this.http.get(this.deepBlueUrl + '/list_experiments', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const data = body[1] || [];
                return data.map((value) => {
                    return new Experiment(value);
                });
            })
            .catch(this.handleError);
    }

    setSelectedBioSources(biosources: BioSource[]) {
        this.selectedBioSources.next(biosources);
    }


    selectAnnotation(annotation: IdName, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!annotation) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.idNamesQueryCache.get(annotation, request_count)) {
            console.log('idnamecache hit');
            progress_element.increment(request_count);
            const cached_operation = this.idNamesQueryCache.get(annotation, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();
        params.set('annotation_name', annotation.name);
        params.set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/select_annotations', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return new DeepBlueOperation(annotation, response, 'select_annotation', request_count);
            })
            .do((operation) => this.idNamesQueryCache.put(annotation, operation))
            .catch(this.handleError);
    }

    selectExperiment(experiment: IdName, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!experiment) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.idNamesQueryCache.get(experiment, request_count)) {
            console.log('selectExperiment hit');
            progress_element.increment(request_count);
            const cached_operation = this.idNamesQueryCache.get(experiment, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();
        params.set('experiment_name', experiment.name);
        params.set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/select_experiments', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return new DeepBlueOperation(experiment, response, 'select_experiment', request_count);
            })
            .do((operation) => {
                this.idNamesQueryCache.put(experiment, operation);
            })
            .catch(this.handleError);
    }

    selectMultipleExperiments(experiments: IdName[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation[]> {

        const observableBatch: Observable<DeepBlueOperation>[] = [];

        experiments.forEach((experiment, key) => {
            console.log(experiment);
            progress_element.increment(request_count);
            observableBatch.push(this.selectExperiment(experiment, progress_element, request_count));
        });

        return Observable.forkJoin(observableBatch);
    }

    filter_region(data: DeepBlueOperation, field: string, operation: string, value: string, type: string, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {


        const parameters = [field, operation, value, type];

        const cache_key = new DeepBlueParametersOperation(data, parameters, 'filter', request_count);

        if (this.filtersQueryCache.get(cache_key, request_count)) {
            progress_element.increment(request_count);
            const cached_operation = this.filtersQueryCache.get(cache_key, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();

        params.set('query_id', data.query_id);
        params.set('field', field);
        params.set('operation', operation);
        params.set('value', value);
        params.set('type', type);

        return this.http.get(this.deepBlueUrl + '/filter_regions', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return new DeepBlueOperation(data.data, response, 'filter', request_count);
            })
            .do((operation) => this.filtersQueryCache.put(cache_key, operation))
            .catch(this.handleError);


    }

    intersectWithSelected(current_operations: DeepBlueOperation[], selected_data: DeepBlueOperation[],
        progress_element: ProgressElement, request_count: number): Observable<StackValue[]> {

        const observableBatch: Observable<StackValue>[] = [];

        current_operations.forEach((current, stack_pos) => {
            selected_data.forEach((selected) => {
                let o: Observable<StackValue>;
                const cache_key = [current, selected];

                if (this.intersectsQueryCache.get(cache_key, request_count)) {
                    console.log('overlapSelected hit');
                    progress_element.increment(request_count);
                    const cached_operation = this.intersectsQueryCache.get(cache_key, request_count);
                    o = Observable.of(new StackValue(stack_pos, cached_operation));
                } else {
                    const params: URLSearchParams = new URLSearchParams();
                    params.set('query_data_id', current.query_id);
                    params.set('query_filter_id', selected.query_id);
                    o = this.http.get(this.deepBlueUrl + '/intersection', { 'search': params })
                        .map((res: Response) => {
                            const body = res.json();
                            const response: string = body[1] || '';
                            progress_element.increment(request_count);
                            return new StackValue(stack_pos, new DeepBlueOperation(selected.data, response, 'intersection', request_count));
                        })
                        .do((operation: StackValue) => this.intersectsQueryCache.put(cache_key, operation.getDeepBlueOperation()))
                        .catch(this.handleError);
                }
                observableBatch.push(o);
            });
        });

        return Observable.forkJoin(observableBatch);
    }

    overlap(data_one: DeepBlueOperation, data_two: DeepBlueOperation, overlap: string, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        const amount = '1';
        const amount_type = 'bp';

        const parameters = [overlap, amount, amount_type];

        const cache_key = new DeepBlueMultiParametersOperation(data_one, data_two, parameters, 'overlap', request_count);

        if (this.overlapsQueryCache.get(cache_key, request_count)) {
            console.log('overlap hit');
            progress_element.increment(request_count);
            const cached_operation = this.overlapsQueryCache.get(cache_key, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();

        // overlap ( query_data_id, query_filter_id, overlap, amount, amount_type, user_key )
        params.set('query_data_id', data_one.query_id);
        params.set('query_filter_id', data_two.query_id);
        params.set('overlap', overlap);
        params.set('amount', '1'); // TODO:  receive this parameter
        params.set('amount_type', 'bp'); // TODO:  receive this parameter

        return this.http.get(this.deepBlueUrl + '/overlap', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return new DeepBlueOperation(data_one.data, response, 'overlap', request_count);
            })
            .do((operation) => this.overlapsQueryCache.put(cache_key, operation))
            .catch(this.handleError);
    }


    cacheQuery(selected_data: DeepBlueOperation, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!selected_data) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.operationCache.get(selected_data, request_count)) {
            console.log('cacheQuery hit');
            progress_element.increment(request_count);
            const cached_operation = this.operationCache.get(selected_data, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();
        params.set('query_id', selected_data.query_id);
        params.set('cache', 'true');
        return this.http.get(this.deepBlueUrl + '/query_cache', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return selected_data.cacheIt(response);
            })
            .do((operation) => this.operationCache.put(selected_data, operation))
            .catch(this.handleError);
    }


    getResult(op_request: DeepBlueRequest, progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('request_id', op_request.request_id);

        const pollSubject = new Subject<DeepBlueResult>();

        if (this.resultCache.get(op_request, request_count)) {
            console.log('getResult hit');
            progress_element.increment(request_count);
            const cached_result = this.resultCache.get(op_request, request_count);
            return Observable.of(cached_result);
        }

        const pollData = this.http.get(this.deepBlueUrl + '/get_request_data', { 'search': params })
            .map((res: Response) => {
                console.log('polling...');
                const body = res.json();
                const status = body[0] || 'error';
                if (status === 'okay') {
                    progress_element.increment(request_count);
                    const op_result = new DeepBlueResult(op_request.data, body[1], op_request, request_count);
                    this.resultCache.put(op_request, op_result);
                    expand.unsubscribe();
                    pollSubject.next(op_result);
                    pollSubject.complete();
                }
            });

        const expand = pollData.expand(
            () => Observable.timer(250).concatMap(() => pollData)
        ).subscribe();

        return pollSubject.asObservable();
    }

    countRegionsRequest(op_exp: DeepBlueOperation, progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('query_id', op_exp.query_id);

        if (this.requestCache.get(op_exp, request_count)) {
            progress_element.increment(request_count);
            const cached_result = this.requestCache.get(op_exp, request_count);
            return this.getResult(cached_result, progress_element, request_count);

        } else {
            const request: Observable<DeepBlueResult> = this.http.get(this.deepBlueUrl + '/count_regions', { 'search': params })
                .map((res: Response) => {
                    const body = res.json();
                    progress_element.increment(request_count);
                    const deepblue_request = new DeepBlueRequest(op_exp.data, body[1] || '', 'count_regions', op_exp, request_count);
                    this.requestCache.put(op_exp, deepblue_request);
                    return deepblue_request;
                })
                .flatMap((request_id) => {
                    return this.getResult(request_id, progress_element, request_count);
                });

            return request;
        }
    }


    getRegions(data: DeepBlueOperation, format: string,
        progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('query_id', data.query_id);
        params.set('output_format', format);

        const request: Observable<DeepBlueResult> = this.http.get(this.deepBlueUrl + '/get_regions', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                progress_element.increment(request_count);
                const deepblue_request = new DeepBlueRequest(data.data, body[1] || '', 'get_regions', data, request_count);
                return deepblue_request;
            })
            .flatMap((deepblue_request) => {
                return this.getResult(deepblue_request, progress_element, request_count);
            });

        return request;
    }

    getResultBatch(op_requests: DeepBlueRequest[], progress_element: ProgressElement, request_count: number): Observable<DeepBlueResult[]> {
        const observableBatch: Observable<DeepBlueResult>[] = [];

        op_requests.forEach((op_request, key) => {
            const o: Observable<DeepBlueResult> = this.getResult(op_request, progress_element, request_count);
            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    countRegionsBatch(query_ids: StackValue[], progress_element: ProgressElement, request_count: number): Observable<StackValue[]> {
        const observableBatch: Observable<StackValue>[] = [];

        query_ids.forEach((op_exp, key) => {
            const o: Observable<StackValue> = new Observable((observer) => {
                this.countRegionsRequest(op_exp.getDeepBlueOperation(), progress_element, request_count).subscribe((result) => {
                    observer.next(new StackValue(op_exp.stack, result));
                    observer.complete();
                });
            });

            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    private extractId(res: Response) {
        const body = res.json();
        return body[1] || '';
    }

    getExperimentsInfos(ids: string[]): Observable<FullExperiment[]> {
        const params: URLSearchParams = new URLSearchParams();
        for (const id of ids) {
            params.append('id', id);
        }

        return this.http.get(this.deepBlueUrl + '/info', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const data = body[1] || [];
                return data.map((value) => {
                    return new FullExperiment(value);
                });
            })
            .catch(this.handleError);
    }

    getInfo(id: string): Observable<Object> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(this.deepBlueUrl + '/info', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const data = body[1] || [];

                if (id[0] === 'e') {
                    return new FullExperiment(data[0]);
                } else if (id[0] === 'a') {
                    return new FullAnnotation(data[0]);
                } else if (id[0] === 'g' && id[1] === 's') {
                    return new FullGeneModel(data[0]);
                } else {
                    console.log('UNKNOW TYPE: ' + id);
                    return new FullExperiment(data[0]);
                }

            }).catch(this.handleError);
    }


    getGeneModelsInfo(ids: string[]): Observable<FullGeneModel[]> {
        const params: URLSearchParams = new URLSearchParams();
        for (const id of ids) {
            params.append('id', id);
        }

        return this.http.get(this.deepBlueUrl + '/info', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const data = body[1] || [];
                return data.map((value) => {
                    return new FullGeneModel(value);
                });
            })
            .catch(this.handleError);
    }

    getGeneModels(): Observable<GeneModel[]> {
        return this.http.get(this.deepBlueUrl + '/list_gene_models')
            .map((res: Response) => {
                const body = res.json();
                const data = body[1] || [];
                return data.map((value) => {
                    return new GeneModel(value);
                });
            })
            .catch(this.handleError);
    }

    selectGenes(gene_model: IdName, progress_element: ProgressElement, request_count: number): Observable<DeepBlueOperation> {
        if (!gene_model) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.idNamesQueryCache.get(gene_model, request_count)) {
            console.log('selectGene hit');
            progress_element.increment(request_count);
            const cached_operation = this.idNamesQueryCache.get(gene_model, request_count);
            return Observable.of(cached_operation);
        }

        const params: URLSearchParams = new URLSearchParams();
        params.set('gene_model', gene_model.name);
        return this.http.get(this.deepBlueUrl + '/select_genes', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                progress_element.increment(request_count);
                return new DeepBlueOperation(gene_model, response, 'select_genes', request_count);
            })
            .do((operation) => {
                this.idNamesQueryCache.put(gene_model, operation);
            })
            .catch(this.handleError);
    }


    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${err.status} - ${err.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    public composedCountOverlaps(queries: DeepBlueOperation[], experiments: IdName[]): Observable<string> {
        const params: URLSearchParams = new URLSearchParams();
        for (const query_op_id of queries) {
            params.append('queries_id', query_op_id.query_id);
        }

        for (const exp of experiments) {
            params.append('experiments_id', exp.id);
        }

        return this.http.get(this.deepBlueUrl + '/composed_commands/count_overlaps', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                const response: string = body[1] || '';
                return response;
            });
    }

    public getComposedResult(request_id: string): Observable<[string, string | DeepBlueMiddlewareOverlapResult[]]> {

        const params: URLSearchParams = new URLSearchParams();
        params.set('request_id', request_id);

        return this.http.get(this.deepBlueUrl + '/composed_commands/get_request', { 'search': params })
            .map((res: Response) => {
                const body = res.json();
                console.log(body);
                const response: [string, string | DeepBlueMiddlewareOverlapResult[]] = body;
                return response;
            });
    }

    public getComposedResultIterator(request_id: string): Observable<DeepBlueMiddlewareOverlapResult[]> {
        const pollSubject = new Subject<DeepBlueMiddlewareOverlapResult[]>();

        const timer = Observable.timer(0, 250).concatMap(() => {
            return this.getComposedResult(request_id).map((data: [string, string | DeepBlueMiddlewareOverlapResult[]]) => {
                // progress_element.increment();
                // let op_result = new DeepBlueResult(op_request.data, data, op_request);
                // this.resultCache.put(op_request, op_result)
                if (data[0] === 'okay') {
                    timer.unsubscribe();
                    pollSubject.next(
                        (<Object[]>(data[1])).map((ee) => DeepBlueMiddlewareOverlapResult.fromObject(ee))
                    );
                    pollSubject.complete();
                } else {
                    console.log(data[1]);
                }
            });
        }).subscribe();

        return pollSubject;
    }


}
