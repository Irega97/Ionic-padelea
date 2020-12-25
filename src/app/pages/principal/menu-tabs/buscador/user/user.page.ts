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
  id;
  tuPerfil: Boolean;
  solicitud: Boolean
  friends;
  notification: Notification;

  ngOnInit() {
      if (this.userService.user == undefined){
        this.userService.getMyUser().subscribe(data =>{
          this.userService.user = data;
          this.compararId();
        })
      }

      else{
        this.compararId();
      }
  }

  compararId(){
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      
      if (this.id == this.userService.user._id){
        this.tuPerfil = true;
        this.user = this.userService.user;
      }

      else{
        this.userService.getUser(this.id).subscribe(data =>{
          this.user = data;
          this.tuPerfil = false;
          if (this.user.friendStatus == -1){
            this.solicitud = false;
          }
          else if (this.user.friendStatus == 0){
            this.solicitud = true;
          }
        }, error => {
          console.log(error);
        });
        this.friendService.getFriends(this.id).subscribe(data => {
          this.friends = data.friends;
        })
      } 
    });
  }

  modificar(){
    this.router.navigate(['/principal/modperfil']);
  }

  addFriend(){
    this.friendService.addFriend(this.id).subscribe((data) => {
      this.component.presentAlert("Solicitud enviada correctamente!");
      let notification = {"type": "Amigos", "description":"Alguien quiere ser tu amigo", "status": 0, "origen": this.userService.user._id, "destino": this.id};
      this.events.enviarNotificacion(notification);
      this.solicitud = true;
      this.user.friendStatus = 0;
    });
  }

  acceptFriend(){
    const body = {accept: true};
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud aceptada correctamente");
      this.user.friendStatus = 2;
      let notification = {"type":"Amigos", "origen": this.id};
      this.events.publish({
        "topic": "deleteNotification",
        "notification": notification
      });
    });
  }

  rejectFriend(){
    const body = {accept: false}
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud rechazada");
      this.user.friendStatus = -1;
      let notification = {"type":"Amigos", "origen": this.id};
      this.events.publish({
        "topic": "deleteNotification",
        "notification": notification
      });
    });
  }

  deleteFriend(){
    this.friendService.delFriend(this.id).subscribe(() => {
      this.component.presentAlert("Amigo eliminado");
      this.user.friendStatus = -1;
    })
  }

  goBack(){
    this.location.back();
  }
}
