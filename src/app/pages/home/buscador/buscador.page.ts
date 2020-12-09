import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  @Input() users;

  usersSearch;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.usersSearch = this.users;
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