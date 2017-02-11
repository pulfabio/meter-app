import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'; //For test w/o server side

@Injectable()
export class AuthService {
  private loggedIn = false;
  redirectUrl: string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    //tokenNotExpired(); Can run this check
  }

  login(email, password) {
    // Mock login function, for testing w/o server side
    this.loggedIn = true;
    return Observable.of(true);;


    //Real login function !!!!

    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        '/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });*/
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}