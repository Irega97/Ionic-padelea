import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ruta = environment.apiURL + '/auth/';
  reload: Boolean = false;
  constructor(private http: HttpClient) { }

  login(user): Observable<Token> {
    return this.http.post<Token>(this.ruta + "login", user);
  }

  register(user): Observable<Token> {
    return this.http.post<Token>(this.ruta + "register", user);
  }

  checkemail(email: string): Observable<{value: boolean, provider: String}>{
    return this.http.get<any>(this.ruta + 'checkemail/' + email);
  }

  signout(): Observable<any> {
    const t = {"token": localStorage.getItem("ACCESS_TOKEN")};
    return this.http.put(this.ruta + "signout", t);
  }

  encryptPassword(password: string){
    try {
      var cipherPsswd = CryptoJS.SHA256(password).toString();
      return cipherPsswd;
    } catch (e) {
    }
  }

  addToken(token: string){
    localStorage.setItem("ACCESS_TOKEN", token);
  }
}
