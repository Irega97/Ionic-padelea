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

  getFriends(idFriend: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + idFriend);
  }

  getMyFriends(): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'me');
  }

  addFriend(idFriend: string): Observable<JSON>{
    return this.http.post<JSON>(this.ruta + idFriend, null);
  }

  changeStatus(idFriend: string, body): Observable<any>{
    return this.http.post<JSON>(this.ruta + idFriend + "/status", body);
  }

  delFriend(idFriend: string){
    return this.http.delete(this.ruta + idFriend);
  }

}
