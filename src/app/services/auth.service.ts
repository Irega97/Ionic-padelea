import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ruta = "/auth/"
  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(environment.apiURL + this.ruta + "login", user, {headers});
  }

  register(user: User): Observable<User> {
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(environment.apiURL + this.ruta + "register", user, {headers});
  }

  signout(user: User): Observable<any> {
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.apiURL + this.ruta + "signout", user, {headers});
  }
}
