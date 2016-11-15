import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Genome, Annotation }     from '../domain/deepblue';
import { Observable }     from 'rxjs/Observable'


@Injectable()
export class DeepBlueService {
    public selectedGenome;

    private deepBlueUrl = 'api';

    constructor (private http: Http) {}

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
        
    getAnnotations() : Observable<Annotation[]> {
        return this.http.get(this.deepBlueUrl + "/list_annotations")
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