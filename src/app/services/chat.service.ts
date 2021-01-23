import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class ChatService{

  ruta = environment.apiURL + "/chat/";
  name: string;
  constructor(private http: HttpClient) { }

  getChat(info): Observable<any> {
    return this.http.post<any>(this.ruta + "get", info);
  }

  getMyChats(): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'me/all');
  }

  getChatsSinLeer(): Observable<any> {
    return this.http.get<any>(this.ruta + "me");
  }

  sendMessage(idChat: string, mensaje): Observable<any> {
    return this.http.post<any>(this.ruta + "message/" + idChat, mensaje);
  }

  addChat(info): Observable<any>{
    return this.http.post<any>(this.ruta + 'new', info);
  }

  addParticipante(idChat: string, participantes): Observable<any>{
      return this.http.post<JSON>(this.ruta + 'addParticipante/' + idChat, participantes);
  }

  addAdmin(idChat: string, participante): Observable<any> {
    return this.http.post<any>(this.ruta + 'addAdmin/' + idChat, participante);
  }

  delChat(idChat: string){
    return this.http.delete(this.ruta + idChat);
  }
  
}