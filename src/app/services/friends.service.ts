import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  ruta = environment.apiURL + "/friends/"
  constructor(private http: HttpClient) { }

  getFriends(usernameFriend: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + usernameFriend);
  }

  addFriend(usernameFriend: string): Observable<JSON>{
    return this.http.post<JSON>(this.ruta + usernameFriend, null);
  }

  changeStatus(usernameFriend: string, body): Observable<any>{
    return this.http.post<JSON>(this.ruta + usernameFriend + "/status", body);
  }

  delFriend(usernameFriend: string){
    return this.http.delete(this.ruta + usernameFriend);
  }
}
