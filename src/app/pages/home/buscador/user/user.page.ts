import { ComponentsService } from './../../../../services/components.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService, private friendService: FriendsService, private route: ActivatedRoute, private component: ComponentsService) { }

  user;
  id;
  solicitud: Boolean

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.userService.getUser(this.id).subscribe(data =>{
        this.user = data;
        if (this.user.friendStatus == -1){
          this.solicitud = false;
        }
        else{
          this.solicitud = true;
        }
      }, error => {
        console.log(error);
      });
    });
  }

  addFriend(){
    this.friendService.addFriend(this.id).subscribe((data) => {
      if(data) this.component.presentAlert("Solicitud enviada correctamente!");
      this.solicitud = true;
    }, (error) => {
      console.log(error);
      this.component.presentAlert("No se ha podido añadir");
    });
  }

  acceptFriend(){
    const body = {accept: true};
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud aceptada correctamente");
    }, (error) => {
      console.log(error);
      this.component.presentAlert("Internal error");
    });
  }

  rejectFriend(){
    const body = {accept: false}
    this.friendService.changeStatus(this.id, body).subscribe(() => {
      this.component.presentAlert("Solicitud aceptada correctamente");
    }, (error) => {
      console.log(error);
      this.component.presentAlert("Internal error");
    });
  }
}
