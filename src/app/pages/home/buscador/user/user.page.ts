import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(public userService: UserService, private route: ActivatedRoute) { }

  user;

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      console.log("id: ", id);
      this.userService.getUser(id).subscribe(data =>{
        console.log("datica: ", data);
        this.user = data;
      }, error => {
        console.log(error);
      });
    });
  }

  addFriend(){}

}
