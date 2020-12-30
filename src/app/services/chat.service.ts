import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class ChatService{

  ruta = environment.apiURL + "/chat/"
  constructor(private http: HttpClient) { }

  getChat(type, idChat: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + idChat);
  }

  getMyChats(): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'me/all');
  }

  addChat(participantes): Observable<JSON>{
    return this.http.post<JSON>(this.ruta + 'new', participantes);
  }

  addOtroParticipante(idChat: string, participantes): Observable<any>{
      return this.http.post<JSON>(this.ruta + 'add/' + idChat, participantes);
  }

  delChat(idChat: string){
    return this.http.delete(this.ruta + idChat);
  }
  
}