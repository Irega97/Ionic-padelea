import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user'
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: User;

  constructor(private userService: UserService, private router: Router, private events: EventsService) { }

  ngOnInit() {
    if (this.userService.user != undefined){
      this.usuario = this.userService.user;
    }

    else{
      this.userService.getMyUser().subscribe(data => {
        this.usuario = data;
        this.userService.user = this.usuario;
    })

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
      }
    })
  }
}

  modificar(){
    this.router.navigate(['/principal/perfil/modperfil']);
  }
}
