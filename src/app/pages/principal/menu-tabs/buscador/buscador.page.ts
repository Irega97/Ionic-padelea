import { EventsService } from 'src/app/services/events.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  @Input() users;

  usersSearch;

  constructor(private userService: UserService, private events: EventsService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.usersSearch = this.users;      
    });
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "loginUser") {
        this.userService.getUsers().subscribe((data) => {
          this.users = data;
          this.usersSearch = this.users;      
        });
      }
    });
  }

  /* const searchbar = document.querySelector('ion-searchbar');
  const items = this.users;

  searchbar.addEventListener('ionInput', handleInput); */

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.usersSearch = this.users.filter((user)=>{
        //console.log("q: " +user.username, user.username.indexOf(query));
        if(user.username && query != ''){
          console.log("P ", user);
          return (user.username.toLowerCase().indexOf(query) > -1)
        }
        else return user;
      });
    });
  }
}