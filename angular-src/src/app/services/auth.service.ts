import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {  
authToken:  any;
user: any;
user1: any;
contus: any;


  constructor(private http:Http) { }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/register', user, {headers: headers})
      .map(res => res.json());
  }


  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/users/profile',{headers: headers})
      .map(res => res.json());
  }   


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  add_customerUser1(user1) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/add_customer', user1, {headers: headers})
      .map(res => res.json());
  }

  storeUser1Data(token, user1) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user1', JSON.stringify(user1));
    this.authToken = token;
    this.user1 = user1;
  }
  
  //contactus stroredata into database
  contactusContus(contus) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/users/contactus', contus, {headers: headers})
      .map(res => res.json());
  }

  storeContusData(token, contus) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('contus', JSON.stringify(contus));
    this.authToken = token;
    this.contus = contus;
  }
  


}
