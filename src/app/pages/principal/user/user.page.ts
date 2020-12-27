import { EventsService } from 'src/app/services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ComponentsService } from 'src/app/services/components.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService, private friendService: FriendsService, private route: ActivatedRoute, 
              private component: ComponentsService, private events: EventsService, private location: Location, private router: Router) { }

  user;
  username;
  tuPerfil: Boolean;
  solicitud: Boolean;
  numAmigos: Number = 0;
  numTorneos: Number = 0;
  notification: Notification;

  ngOnInit() {
    if (this.userService.user != undefined){
      this.compararId();
    }

    this.events.getObservable().subscribe(data => {
      if (data.topic == "updateUser"){
        this.user = data.user;
        this.compararId();
      }
    })
  }

  compararId(){
    this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      
      if (this.username == this.userService.user.username){
        this.tuPerfil = true;
        this.user = this.userService.user;
        this.userService.getNum().subscribe(data => {
          this.numAmigos = data.numAmigos;
          this.numTorneos = data.numTorneos;
        })
      }

      else{
        this.userService.getUser(this.username).subscribe(data =>{
          this.user = data;
          this.numAmigos = this.user.numAmigos;
          this.numTorneos = this.user.numTorneos;
          this.tuPerfil = false;
          if (this.user.friendStatus == -1){
            this.solicitud = false;
          }
          else if (this.user.friendStatus == 0){
            this.solicitud = true;
          }
        }, error => {
          if (error.status == 404){
            this.location.back();
          }
        });
      } 
    });
  }

  modificar(){
    this.router.navigateByUrl('/user/'+ this.userService.user.username + '/modificar');
  }

  goAmigos(){
    this.router.navigateByUrl('/user/'+ this.username + '/amigos');
  }

  goTorneos(){
    this.router.navigateByUrl('/user/'+ this.username + '/torneos');
  }

  goInformacion(){
    this.router.navigate(['/user/'+ this.username + '/informacion'], { state : { user: this.user }});
  }

  addFriend(){
    this.friendService.addFriend(this.username).subscribe(() => {
      this.component.presentAlert("Solicitud enviada correctamente!");
      let notification = {"type": "Amigos", "description": this.userService.user.username + " quiere ser tu amigo", "status": 0, "origen": this.userService.user.username, "image": this.userService.user.image, "destino": this.user._id};
      this.events.enviarNotificacion(notification);
      this.solicitud = true;
      this.user.friendStatus = 0;
    });
  }

  acceptFriend(){
    const body = {accept: true};
    this.friendService.changeStatus(this.username, body).subscribe(() => {
      this.component.presentAlert("Solicitud aceptada correctamente");
      this.user.friendStatus = 2;
      let notification = {"type":"Amigos", "origen": this.username};
      this.events.publish({
        "topic": "deleteNotification",
        "notification": notification
      });
    });
  }

  rejectFriend(){
    const body = {accept: false}
    this.friendService.changeStatus(this.username, body).subscribe(() => {
      this.component.presentAlert("Solicitud rechazada");
      this.user.friendStatus = -1;
      let notification = {"type":"Amigos", "origen": this.username};
      this.events.publish({
        "topic": "deleteNotification",
        "notification": notification
      });
    });
  }

  deleteFriend(){
    this.friendService.delFriend(this.username).subscribe(() => {
      this.component.presentAlert("Amigo eliminado");
      this.user.friendStatus = -1;
    })
  }
}
