import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private socket: Socket) { }

  private dataSubject = new Subject<any>();

  public publish(data: any) {
    this.dataSubject.next(data);
  }

  public getObservable(): Subject<any> {
    return this.dataSubject;
  }

  public connectSocket(id: String, username: String){
    this.socket.connect();
    let data = {"id": id, "username": username};
    this.socket.emit('nuevoConectado', data); 
    this.socket.fromEvent('nuevoConectado').subscribe(data =>{
      this.publish({
        "topic": "nuevoConectado",
        "user": data
      })
    });
  }

  public disconnectSocket(){
    this.socket.disconnect();
  }
}