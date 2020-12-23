import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Subject} from "rxjs";
import { User } from '../models/user';
import { ComponentsService } from './components.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private socket: Socket, private components: ComponentsService) { }

  private dataSubject = new Subject<any>();

  public publish(data: any) {
    this.dataSubject.next(data);
  }

  public getObservable(): Subject<any> {
    return this.dataSubject;
  }

  public connectSocket(id: String, username: String){
    let data = {"id": id, "username": username};
    this.socket.emit('nuevoConectado', data); 
    this.socket.on('nuevaNotificacion', notificacion => {
      console.log("notificacion", notificacion);
      this.components.presentAlert("Notificacion Recibida");
    })
  }

  public enviarNotificacion(notification){
    this.socket.emit('nuevaNotificacion', notification);
  }

  public disconnectSocket(){
    this.socket.disconnect();
  }

  public createChatRoom(chatId : String){
    this.socket.emit('nuevaSala', chatId)
  }

  public sendMessage() {
    this.socket.emit('send-message', { text: "prueba" });
  }
}