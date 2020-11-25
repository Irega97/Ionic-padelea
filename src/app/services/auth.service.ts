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
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Token>(environment.apiURL + this.ruta + "login", user, {headers});
  }

  register(user: User): Observable<Token> {
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Token>(environment.apiURL + this.ruta + "register", user, {headers});
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
}
