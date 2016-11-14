import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Annotation }     from '../domain/deepblue';
import { Observable }     from 'rxjs/Observable'


@Injectable()
export class DeepBlueService {
    private deepBlueUrl = 'deepblue';

    constructor (private http: Http) {}

    getAnnotations() : Observable<Annotation[]> {
        return this.http.get(this.deepBlueUrl + "/list_annotations")
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData( res: Response) {
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