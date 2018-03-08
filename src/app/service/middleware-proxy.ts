import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";


@Injectable()
export class MiddlewareProxy {

  private deepBlueUrl = 'api';

  constructor(private http: HttpClient) {
    console.info('Starting Middleware Proxy');
  }

  get<T>(command: string, params?: HttpParams): Observable<T> {
    if (params) {
      return this.http.get<T>(this.deepBlueUrl + '/' + command, { params: params }).pipe(
        retry(),
        catchError(this.handleError) // then handle the error
      );
    }
    return this.http.get<T>(this.deepBlueUrl + '/' + command).pipe(
      retry(),
      catchError(this.handleError) // then handle the error
    );
  }

  post(command: string, request: any): Observable<Object> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.deepBlueUrl + '/' + command, request, { headers: headers }).pipe(
      retry(),
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}