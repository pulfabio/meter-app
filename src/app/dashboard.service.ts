import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'; //For test w/o server side

//Import mock meter, for tests w/o server side
import { METERS } from "./mock-meter";

@Injectable()
export class DashboardService {
  constructor(private http: Http) {}

  getMeters() {
    //Mock meter service, for testing w/o server side
    return Observable.of(METERS);


    //Real getMeters() method
    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/meters', { headers })
      .map(res => res.json());*/
  }
}