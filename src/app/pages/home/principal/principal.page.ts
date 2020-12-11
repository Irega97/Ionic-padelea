import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService,
    private socket: Socket) { }

  ngOnInit() {
    this.userService.getMyUser().subscribe((data:any) => {
      this.usuario = data;
      this.socket.connect();
      let username = {"id": data._id, "username": this.usuario.username};
      this.socket.emit('set-name', username); 
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
      }
      else if (data.topic == "loginUser"){
        this.userService.getMyUser().subscribe((data:any) => {
          this.usuario = data;
          this.socket.connect();
          let username = {"id": data._id, "username": this.usuario.username};
          this.socket.emit('set-name', username); 
        });
      }
    }) 
  }

  logout(){
    this.authService.signout().subscribe(data =>{
      localStorage.clear();
      this.socket.disconnect();
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario
      }
    };
      this.router.navigate(['/principal/perfil'], navigationExtras);
  }

  goTorneos(){

  }

  goPartidos(){

  }

  goAmigos(){
    
  }
}
