import { ComponentsService } from './components.service';
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

  ruta = environment.apiURL + '/auth/';
  constructor(private http: HttpClient) { }

  login(user): Observable<Token> {
    return this.http.post<Token>(this.ruta + "login", user);
  }

  register(user: User): Observable<Token> {
    return this.http.post<Token>(this.ruta + "register", user);
  }

  checkSocialAccount(email: string): Observable<{value: boolean}>{
    return this.http.get<any>(this.ruta + '/checkSocial/' + email);
  }

  signout(): Observable<any> {
    const t = {"token": this.getToken()};
    return this.http.put(this.ruta + "signout", t);
  }

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
      const now = Date.now();
      const expiresAt = sessionStorage.getItem("TOKEN_EXPIRES");
      const left = parseInt(expiresAt) - now;
      if(expiresAt && left > 3600){
        return true;
      }
      else{ 
        sessionStorage.removeItem("TOKEN_EXPIRES");
        return false; 
      } 
    }
    else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('ACCESS_TOKEN');
  }

  addToken(token: string){
    console.log("add token");
    let expires = 3600;
    let now = Date.now()
    let expiresAt = now + expires * 1000;
    localStorage.setItem("ACCESS_TOKEN", token);
    sessionStorage.setItem("TOKEN_EXPIRES", expiresAt.toString());
  }
}
