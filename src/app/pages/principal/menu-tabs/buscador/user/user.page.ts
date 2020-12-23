import { EventsService } from 'src/app/services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService, private friendService: FriendsService, private route: ActivatedRoute, 
              private component: ComponentsService, private events: EventsService) { }

  user;
  id;
  solicitud: Boolean
  friends;
  notification: Notification;

  ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        this.id = paramMap.get('id');
        this.userService.getUser(this.id).subscribe(data =>{
          this.user = data;
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
      });
  }

  addFriend(){
    this.friendService.addFriend(this.id).subscribe((data) => {
      this.component.presentAlert("Solicitud enviada correctamente!");
      let notification = {"type": "Amigos", "description":"Alguien quiere ser tu amigo", "status": 0, "destino": this.id};
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
}
