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

  public connectSocket(id: String){
    this.socket.connect.arguments(id);
  }

  public disconnectSocket(id: String){
    this.socket.disconnect.arguments(id);
  }
}