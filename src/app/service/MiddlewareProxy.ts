import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class MiddlewareProxy {

  private deepBlueUrl = 'api';

  constructor(private http: HttpClient) {
    console.info('Starting DeepBlue Service');
  }

  get<T>(command: string, params?: HttpParams) : Observable<T> {
    if (params) {
      return this.http.get<T>(this.deepBlueUrl + '/' + command, {params: params})
    }
    return this.http.get<T>(this.deepBlueUrl + '/' + command)
  }

  post(command: string, request: any) : Observable<Object> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.deepBlueUrl + '/' + command, request, { headers: headers })
  }

}