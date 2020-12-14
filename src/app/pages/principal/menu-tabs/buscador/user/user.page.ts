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
      if(data) this.component.presentAlert("Solicitud enviada correctamente!");
      this.solicitud = true;
      this.user.friendStatus = 0;
    }, (error) => {
      console.log(error);
      this.component.presentAlert("No se ha podido añadir");
    });
  }

  acceptFriend(){
    const body = {accept: true};
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud aceptada correctamente");
      this.user.friendStatus = 2;
    }, (error) => {
      console.log(error);
      this.component.presentAlert("Internal error");
    });
  }

  rejectFriend(){
    const body = {accept: false}
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud rechazada");
      this.user.friendStatus = -1;
    }, (error) => {
      console.log(error);
      this.component.presentAlert("Internal error");
    });
  }

  deleteFriend(){
    this.friendService.delFriend(this.id).subscribe(() => {
      this.component.presentAlert("Amigo eliminado");
      this.user.friendStatus = -1;
    }, (error) => {
      console.log(error);
      this.component.presentAlert("Internal error");
    })
  }
}
