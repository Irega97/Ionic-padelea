import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  
  ruta = environment.apiURL + "/user/"
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ruta + "all");
  }

  getUser(id: String): Observable<User> {
    return this.http.get<User>(this.ruta + id);
  }

  getMyUser(): Observable<User> {
    return this.http.get<User>(this.ruta + "me");
  }

  update(user): Observable<Token> {
    return this.http.post<Token>(this.ruta + "me", user);
  }
}
