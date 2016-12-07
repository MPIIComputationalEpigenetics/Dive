import { Injectable }     from '@angular/core';
import { Http,
         Response, 
         URLSearchParams } from '@angular/http';

import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import { Observable }     from 'rxjs/Observable'

import { Subject }     from 'rxjs/Subject'

import { IdName,
         EpigeneticMark, 
         Experiment,
         Genome, 
         Annotation,
        ProgressElement }     from '../domain/deepblue';


    export class SelectedData {
        constructor (public idName: IdName, public query_id: string) { }
    }

    export class DataStack {

        _data: SelectedData[] = [];

        init(data: SelectedData) {
            this._data = [];
            this._data.push(data);
        }

        insert(data: SelectedData) {
            this._data.push(data);
        }

        remove(data: SelectedData) {
            // TODO :)
        }

        getData() : SelectedData[] {
            return this._data;
        }

        getCurrent() : SelectedData { 
            return this._data[this._data.length-1];
        }
    }

    export class DeepBlueOperation {
        constructor (public data: IdName, public query_id: string, public command: string, public request_count: number, public cached: boolean = false) { }

        cacheIt(query_id: string) : DeepBlueOperation {
            return new DeepBlueOperation(this.data, query_id, this.command, this.request_count, true);
        }

        getSelectedData() : SelectedData {
            return new SelectedData(this.data, this.query_id);
        }
    }

    export class DeepBlueRequest {
        constructor (public data: IdName, public request_id: string, public request_count: number) { }
    }

    export class DeepBlueResult {
        constructor (public data: IdName, public result: Object, public request_count: number) { }
    }




@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'api';

    // Observable string sources
    public genomeSource = new BehaviorSubject<Genome>({id: "-", name: "-", extra_metadata: null});
    public annotationSource = new BehaviorSubject<Annotation>({id: "-", name: "-", extra_metadata: null});
    public epigeneticMarkSource = new BehaviorSubject<EpigeneticMark>({id: "-", name: "-", extra_metadata: null});
    public dataInfoSelectedSource = new BehaviorSubject<any>(null);


    totalSelectedRegtions : Number = 0;            

    // Observable string streams
    genomeValue$: Observable<Genome> = this.genomeSource.asObservable();
    annotationValue$: Observable<Annotation> = this.annotationSource.asObservable();
    epigeneticMarkValue$: Observable<EpigeneticMark> = this.epigeneticMarkSource.asObservable();
    dataInfoSelectedValue$: Observable<any> = this.dataInfoSelectedSource.asObservable();

    dataStack: DataStack = new DataStack();

    setDataInfoSelected(data: any) {
        this.dataInfoSelectedSource.next(data);
    }

    getDataInfoSelected() : any {        
        return this.dataInfoSelectedSource.getValue();
    }

    getDataStack() : DataStack {
        return this.dataStack;
    }

    getTotalSelectedRegtions() : Number {
        return this.totalSelectedRegtions;
    }

    // Service messages
    setGenome(genome: Genome) {
        this.genomeSource.next(genome);
    }

    /* Define the annotation that we are going to dive */
    setAnnotation(annotation: Annotation) {        
        let progress_element: ProgressElement = new ProgressElement();
        let request_count = 0;        
        progress_element.reset(4, request_count);
        this.annotationSource.next(annotation);

        this.selectAnnotation(annotation, progress_element, request_count).subscribe((selected_annotation) =>  {
            this.cacheQuery(selected_annotation, progress_element, request_count).subscribe((cached_data) => {                
                let sd: SelectedData = new SelectedData(annotation, cached_data.query_id);
                this.dataStack.init(sd);
                let dbo: DeepBlueOperation = new DeepBlueOperation(annotation, cached_data.query_id, "select_annotation", 0);                
                this.countRegionsRequest(dbo, progress_element, request_count).subscribe((total) => {
                    this.totalSelectedRegtions = total["result"]["count"];
                })
            })
        }); 
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

    constructor (private http: Http) { }

    // Functions to select data from the Server


    getHistones() : Observable<EpigeneticMark[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', this.getGenome().name);
        params.set('controlled_vocabulary', "epigenetic_marks");
        params.set('type', "peaks");
        return this.http.get(this.deepBlueUrl + "/collection_experiments_count", {"search": params})        
            .map(this.extractHistone)
            .catch(this.handleError);
    }

    private extractHistone( res: Response) {
        let body = res.json();
        let data =  body[1] || [] ;
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
    }que 

    getGenomes() : Observable<Genome[]> {
        return this.http.get(this.deepBlueUrl + "/list_genomes")
            .map(this.extractGenomes)
            .catch(this.handleError);
    }

    private extractGenomes( res: Response) {
        let body = res.json();
        let data =  body[1] || [] ;
        return data.map((value) => {
            return new Genome(value);
        });
    }
        
    getAnnotations(genome) : Observable<Annotation[]> {
        if (!genome) {
            return Observable.empty<Annotation[]>();
        }
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', genome.name);
        return this.http.get(this.deepBlueUrl + "/list_annotations", {"search": params})
            .map(this.extractAnnotation)
            .catch(this.handleError);
    }

    private extractAnnotation( res: Response) {
        let body = res.json();
        let data =  body[1] || [] ;
        return data.map((value) => {
            return new Annotation(value);
        });
    }

    getExperiments(genome, epigenetic_mark) : Observable<IdName[]> {
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
        return this.http.get(this.deepBlueUrl + "/list_experiments", {"search": params})
            .map((res: Response) => {
                let body = res.json();
                let data =  body[1] || [] ;
                return data.map((value) => {
                    return new Experiment(value);
                });
            })
            .catch(this.handleError);        
    }

    
    selectAnnotation(annotation, progress_element: ProgressElement, request_count: number) : Observable<DeepBlueOperation> {
        if (!annotation) {
            return Observable.empty<DeepBlueOperation>();
        }        

        let params: URLSearchParams = new URLSearchParams();
        params.set("annotation_name", annotation.name);
        params.set("genome", this.getGenome().name);
        return this.http.get(this.deepBlueUrl + "/select_annotations", {"search": params})
            .map((res: Response) => {
                let body = res.json();
                    let response: string = body[1] || "" ;
                    progress_element.increment(request_count);
                    return new DeepBlueOperation(annotation, response, "select_annotation", request_count);
                })
            .catch(this.handleError);
    }

    selectExperiment(experiment, progress_element: ProgressElement, request_count: number) : Observable<DeepBlueOperation> {
        if (!experiment) {
            return Observable.empty<DeepBlueOperation>();
        }        

        let params: URLSearchParams = new URLSearchParams();
        params.set("experiment_name", experiment.name);
        params.set("genome", this.getGenome().name);        
        return this.http.get(this.deepBlueUrl + "/select_experiments", {"search": params})
            .map((res: Response) => {
                let body = res.json();
                    let response: string = body[1] || "" ;
                    progress_element.increment(request_count);
                    return new DeepBlueOperation(experiment, response, "select_experiment", request_count);
                })
            .catch(this.handleError);
    }

    selectMultipleExperiments(experiments: Object[], progress_element: ProgressElement, request_count: number) : Observable<DeepBlueOperation[]> {

        let observableBatch: Observable<DeepBlueOperation>[] = [];

        experiments.forEach(( experiment, key ) => {
            progress_element.increment(request_count);
            observableBatch.push( this.selectExperiment(experiment, progress_element, request_count) );
        });

        return Observable.forkJoin(observableBatch);
    }


    overlapWithSelected(selected_data: DeepBlueOperation[], progress_element: ProgressElement, request_count: number) : Observable<DeepBlueOperation[]> {

        let observableBatch: Observable<DeepBlueOperation>[] = [];

        selected_data.forEach(( selected, key ) => {
            let params: URLSearchParams = new URLSearchParams();
            params.set("query_data_id", this.dataStack.getCurrent().query_id);
            params.set("query_filter_id", selected.query_id);
            let o : Observable<DeepBlueOperation> =  
                this.http.get(this.deepBlueUrl + "/intersection", {"search": params})
                .map((res: Response) => {
                    let body = res.json();
                    let response: string = body[1] || "" ;
                    progress_element.increment(request_count);
                    return new DeepBlueOperation(selected.data, response, "intersection", request_count);
                })
                .catch(this.handleError);

            observableBatch.push(o);             
        });

        return Observable.forkJoin(observableBatch);
    }


    cacheQuery(selected_data: DeepBlueOperation, progress_element: ProgressElement, request_count: number) : Observable<DeepBlueOperation> {
        if (!selected_data) {
            return Observable.empty<DeepBlueOperation>();
        }        

        let params: URLSearchParams = new URLSearchParams();
        params.set("query_id", selected_data.query_id);
        params.set("cache", "true");
        return this.http.get(this.deepBlueUrl + "/query_cache", {"search": params})
            .map((res: Response) => {
                    let body = res.json();
                    let response: string = body[1] || "" ;
                    progress_element.increment(request_count);
                    return selected_data.cacheIt(response);
            })
            .catch(this.handleError);
    }    


    getResult(op_request: DeepBlueRequest, progress_element: ProgressElement, request_count: number) : Observable<DeepBlueResult> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("request_id", op_request.request_id);
        
        let pollSubject = new Subject<DeepBlueResult>();

        let pollData = this.http.get(this.deepBlueUrl + "/get_request_data", {"search" : params})
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

    countRegionsRequest(op_exp: DeepBlueOperation, progress_element: ProgressElement, request_count: number) : Observable<DeepBlueResult> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("query_id", op_exp.query_id);

        let request : Observable<DeepBlueResult> = 
            this.http.get(this.deepBlueUrl + "/count_regions", {"search": params})
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

    getResultBatch(op_requests: DeepBlueRequest[], progress_element: ProgressElement, request_count: number) :  Observable<DeepBlueResult[]> {
        let observableBatch: Observable<DeepBlueResult>[] = [];

        op_requests.forEach(( op_request, key ) => {
            let o : Observable<DeepBlueResult> = this.getResult(op_request, progress_element, request_count);
            observableBatch.push(o);             
        });

        return Observable.forkJoin(observableBatch);

    }

    countRegionsBatch(query_ids: DeepBlueOperation[], progress_element: ProgressElement, request_count: number) :  Observable<DeepBlueResult[]> {
        let observableBatch: Observable<DeepBlueResult>[] = [];

        query_ids.forEach(( op_exp, key ) => {
            let o : Observable<DeepBlueResult> = this.countRegionsRequest(op_exp, progress_element, request_count);

            observableBatch.push(o);             
        });

        return Observable.forkJoin(observableBatch);

    }

    private extractId( res: Response) {
        let body = res.json();
        return body[1] || "" ;
    }

    getInfos(ids: string[]) : Observable<Object[]> {
        let params: URLSearchParams = new URLSearchParams();
        for (let id of ids) {
            params.append('id', id);
        }
     
        return this.http.get(this.deepBlueUrl + "/info", {"search": params})
            .map(this.extractExperiment)
            .catch(this.handleError);
    }

    private extractExperiment( res: Response ) : Object[] {
        let body = res.json();
        let data = body[1] || [];

        return data as Object[];
    }

    private handleError (error: Response | any ) {
        let errMsg : string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${err.status} - ${ err.statusText || ''} ${err}`
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    public includeFilter(experiment: Experiment) {
        console.log('includeFilter', experiment);
    }
}
