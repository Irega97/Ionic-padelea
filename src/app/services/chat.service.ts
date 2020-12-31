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

  getChat(info): Observable<any> {
    return this.http.post<any>(this.ruta + "get", info);
  }

  getMyChats(): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'me/all');
  }

  sendMessage(idChat: string, mensaje): Observable<any> {
    return this.http.post<any>(this.ruta + "message/" + idChat, mensaje);
  }

  addChat(info): Observable<any>{
    return this.http.post<any>(this.ruta + 'new', info);
  }

  addOtroParticipante(idChat: string, participantes): Observable<any>{
      return this.http.post<JSON>(this.ruta + 'add/' + idChat, participantes);
  }

  delChat(idChat: string){
    return this.http.delete(this.ruta + idChat);
  }
  
}