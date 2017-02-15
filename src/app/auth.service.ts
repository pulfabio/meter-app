import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'; //For test w/o server side

@Injectable()
export class AuthService {
  private loggedIn = false;
  redirectUrl: string;

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    // Mock login function, for testing w/o server side
    // this.loggedIn = true;
    // return Observable.of(true);;

    //Real login function !!!!

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        'http://localhost:3001/api/login',
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log(res.auth_token);
          localStorage.setItem('auth_token', res.auth_token);
          // var tok = localStorage.getItem('auth_token');//Debugging
          // console.log(tok); //Debugging
          this.loggedIn = true;
          // console.log(this.loggedIn); //Debugging
        }
        console.log(res.message);
        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}