import { Injectable }     from '@angular/core';
import { Http,
         Response, 
         URLSearchParams } from '@angular/http';

import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import { Genome, Annotation }     from '../domain/deepblue';
import { Observable }     from 'rxjs/Observable'


@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'api';

    // Observable string sources
    public genomeSource = new BehaviorSubject<Genome>({id: "g1", name: "hg19", extra_metadata: null});

    // Observable string streams
    genomeValue$: Observable<Genome> = this.genomeSource.asObservable();

    // Service messages
    setGenome(genome: Genome) {
        this.genomeSource.next(genome);
    }

    getGenome(): Genome {
        return this.genomeSource.getValue();
    }

    constructor (private http: Http) { }

    // Functions to select data from the Server
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
        let params: URLSearchParams = new URLSearchParams();
        params.set('genome', genome.name);
        console.log(genome.name);
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