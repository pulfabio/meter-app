import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/of'; //For test w/o server side

import { Meter } from "./meter";
import { Summary } from "./summary";
//Import mock meter, for tests w/o server side
//import { METERS } from "./mock-meter";

@Injectable()
export class DashboardService {
  private elettrUrl = "http://localhost:3001/api/meters/elettr";  // URL to web API
  private gasUrl = "http://localhost:3001/api/meters/gas";  // URL to web API
  private detailsUrl = "http://localhost:3001/api/meters/details/";  // URL to web API, we'll append the 'livello' param in the getDetails method

  constructor(private http: Http) {}

  getElettrMeters(): Observable<Summary[]> {
    //Mock meter service, for testing w/o server side
    // return Observable.of(Meter[]);

    //Real getMeters() method
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.elettrUrl, { headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getGasMeters(): Observable<Summary[]> {
    //Mock meter service, for testing w/o server side
    // return Observable.of(Meter[]);

    //Real getMeters() method
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.gasUrl, { headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetails(livello: string): Observable<Meter[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.detailsUrl + livello, { headers }) //send 'livello' as url parameter
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Extract JS object from json response (which comes wrapped in data property)
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  // handleError method as per the Angular.io website
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // Simpler version of handleError (Promise vs Observable)
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

}