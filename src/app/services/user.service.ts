import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  i: number = 0;
  
  ruta = environment.apiURL + "/user/"
  constructor(private http: HttpClient, private events: EventsService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ruta + "all");
  }

  getUser(id: String): Observable<User> {
    return this.http.get<User>(this.ruta + id);
  }

  getMyUser(): void {
    if (this.user == undefined && this.i == 0)
    {
      this.i++;
      this.http.get<User>(this.ruta + "me").subscribe(user => {
        this.user = user;
        this.events.publish({
          "topic": "updateUser",
          "user": this.user
        })
        this.events.connectSocket(this.user);
      })
    }
  }

  update(user): Observable<Token> {
    return this.http.post<Token>(this.ruta + "me", user);
  }
}
