import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import * as CryptoJS from 'crypto-js';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ruta = "/auth/"
  constructor(private http: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(environment.apiURL + this.ruta + "login", user);
  }

  register(user: User): Observable<Token> {
    return this.http.post<Token>(environment.apiURL + this.ruta + "register", user);
  }

  /*signout(user: User): Observable<any> {
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.apiURL + this.ruta + "signout", user, {headers});
  }*/

  encryptPassword(password: string){
    try {
      var cipherPsswd = CryptoJS.SHA256(password).toString();
      return cipherPsswd;
    } catch (e) {
      console.log(e);
    }
  }

  isLoggedIn(){
    if (this.getToken() != null){
      return true;
    }

    else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
