import { Injectable }     from '@angular/core';
import { Http,
         Response, 
         URLSearchParams } from '@angular/http';

import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import { Observable }     from 'rxjs/Observable'

import { IdName,
         EpigeneticMark, 
         Genome, 
         Annotation }     from '../domain/deepblue';


@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'api';

    // Observable string sources
    public genomeSource = 
        new BehaviorSubject<Genome>({id: "g1", name: "hg19", extra_metadata: null});
    public annotationSource = 
        new BehaviorSubject<Annotation>({id: "a0", name: "-", extra_metadata: null});
    public epigeneticMarkSource = 
        new BehaviorSubject<EpigeneticMark>({id: "em0", name: "-", extra_metadata: null});        

    // Observable string streams
    genomeValue$: Observable<Genome> = this.genomeSource.asObservable();
    annotationValue$: Observable<Annotation> = this.annotationSource.asObservable();
    epigeneticMarkValue$: Observable<EpigeneticMark> = this.epigeneticMarkSource.asObservable();

    // Service messages
    setGenome(genome: Genome) {
        this.genomeSource.next(genome);
    }

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
        var data =  body[1] || [] ;
        var regexp = new RegExp("h([134]|2[ab])([a-z])([0-9]+)(.*)");
        
        data = data.filter((em) => {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort((em1, em2) => {
            return em1[1].localeCompare(em2[1]);
        });;

        return data.map((value) => {
            return (new EpigeneticMark(value));
        });
    }

    getGenomes() : Observable<Genome[]> {
        return this.http.get(this.deepBlueUrl + "/list_genomes")
            .map(this.extractGenomes)
            .catch(this.handleError);
    }

    private extractGenomes( res: Response) {
        let body = res.json();
        var data =  body[1] || [] ;
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
        var data =  body[1] || [] ;
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
            .map(this.extractIdName)
            .catch(this.handleError);        
    }

    private extractIdName( res: Response) {
        let body = res.json();
        var data =  body[1] || [] ;
        return data.map((value) => {
            return new IdName(value);
        });
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
        var data = body[1] || [];

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
}