import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Subject} from "rxjs";
import { User } from '../models/user';
import { ComponentsService } from './components.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private conectado: Boolean = true;
  constructor(private socket: Socket, private components: ComponentsService) { }

  private dataSubject = new Subject<any>();

  public publish(data: any) {
    this.dataSubject.next(data);
  }

  public getObservable(): Subject<any> {
    return this.dataSubject;
  }

  public connectSocket(user: User){
    if (!this.conectado){
      this.socket.connect();
      this.conectado = true;
    }

    let data = {"id": user._id, "username": user.username};
    this.socket.emit('nuevoConectado', data);
    this.socket.on('nuevaNotificacion', notification => {
      this.components.presentToast(notification);
      this.publish({
        "topic": "nuevaNotificacion",
        "notification": notification
      })
    });
    this.socket.on('nuevoUsuario', usuario => {
      this.publish({
        "topic": "nuevoUsuario",
        "user": usuario
      })
    });
  }

  public disconnectSocket(){
    this.socket.disconnect();
    this.conectado = false;
  }

  public createChatRoom(chatId : String){
    this.socket.emit('nuevaSala', chatId)
  }

  public sendMessage() {
    this.socket.emit('send-message', { text: "prueba" });
  }
}