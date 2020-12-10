import { ComponentsService } from './../../../../services/components.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(public userService: UserService, private route: ActivatedRoute, private component: ComponentsService) { }

  user;
  id;

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log("id: ", this.id);
      this.userService.getUser(this.id).subscribe(data =>{
        console.log("datica: ", data);
        this.user = data;
      }, error => {
        console.log(error);
      });
    });
  }

  addFriend(){
    this.userService.addFriend(this.id).subscribe((data) => {
      if(data) this.component.presentAlert("Amigo añadido correctamente!");
    }, (error) => {
      console.log(error);
      this.component.presentAlert("No se ha podido añadir");
    });
  }
}
