import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta = environment.apiURL + "/user"
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ruta + "/all");
  }

  getMyUser(): Observable<User> {
    return this.http.get<User>(this.ruta + "/me");
  }

  changeUsername(username: string){
    return this.http.post(this.ruta + "/setusername/" + username, null);
  }
}
