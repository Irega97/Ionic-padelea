import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Subject} from "rxjs";
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { ComponentsService } from './components.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private conectado: Boolean = true;
  private username: string;
  constructor(private socket: Socket, private components: ComponentsService, private authService: AuthService) { }

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
    this.username = user.username;
    this.socket.emit('nuevoConectado', data);
    this.socket.on('nuevaNotificacion', notification => {
      this.components.presentToast(notification);
      this.publish({
        "topic": "nuevaNotificacion",
        "notification": notification
      });
    });

    this.socket.on('nuevoUsuario', usuario => {
      this.publish({
        "topic": "nuevoUsuario",
        "user": usuario
      });
    });

    this.socket.on('nuevoJugador', jugador => {
      this.publish({
        "topic": "nuevoJugador",
        "jugador": jugador
      });
    });

    this.socket.on('nuevoTorneo', torneo => {
      this.publish({
        "topic": "nuevoTorneo",
        "torneo": torneo
      })
    })

    this.socket.on('player-left', jugador => {
      this.publish({
        "topic":"player-left",
        "jugador": jugador
      })
    })

    this.socket.on('nuevoMensaje', mensaje => {
      if (this.username != mensaje.sender){
        let notification = {
          description: mensaje.sender + " te ha enviado un mensaje"
        }
        this.components.presentToast(notification);
        this.publish({
          "topic": "nuevoMensaje",
          "mensaje": mensaje
        })
      }
    })

    this.socket.on('actConectado', user => {
      this.publish({
        "topic": "actConectado",
        "user": user
      })
    })
  }

  public disconnectSocket(){
    localStorage.removeItem("ACCESS_TOKEN");
    this.authService.reload = true;
    this.conectado = false;
    this.socket.disconnect();
  }
}