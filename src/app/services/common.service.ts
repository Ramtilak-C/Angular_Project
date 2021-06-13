import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedId : number;
  constructor(private http: HttpClient) { }

  getHttpResponse(url, request = null, requestType?): Observable<any> {
    const headers = new HttpHeaders(
      {
         'Content-Type': 'applicayion/json',
         'Authorization': 'Basic ' + btoa('frontend@shyftplan.com:api_test_auth_token')
      }
    );
    const params = new HttpParams();
    if(request) {
      for(const i in request) {
        params.set(i, request[i]);
      }
    }
    return this.http.get(url, { headers: headers, params: params, observe: 'response'})
    .pipe(
      map((res) => this.responseHandler(res, requestType)),
      catchError(error => this.errorHandler(error)))
  }

  errorHandler(error) {
    if(error.status == 404) {
      return throwError(new Error('Selected event is not found'));
    }
    return throwError(error);
  }

  responseHandler(res: any, requiredFullResponse = false.valueOf, requestType?) {
    return res.body || null;
  }
}
