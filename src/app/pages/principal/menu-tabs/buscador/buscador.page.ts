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
  cargando: Boolean = true;

  constructor(private userService: UserService, private events: EventsService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.usersSearch = this.users;   
      this.cargando = false;   
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "nuevoUsuario") {
        if (data.user.username != this.userService.user.username){
          this.users.push(data.user);
        }
      }

      else if (data.topic == "disconnectUser"){
        this.users.push(data.user);
        this.usersSearch = this.users;
      }

      else if (data.topic == "updateUser"){
        if (this.users != undefined){
          this.users.forEach(user => {
            if (user.username == data.user.username){
              let i = this.users.indexOf(user);
              this.users.splice(i, 1);
              this.usersSearch = this.users;
            }
          })
        }
      }
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.usersSearch = this.users.filter((user)=>{
        if(user.username && query != ''){
          return (user.username.toLowerCase().indexOf(query) > -1)
        }
        else return user;
      });
    });
  }
}