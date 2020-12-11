import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: RefreshService, 
    private socket: Socket) { }

  ngOnInit() {
    this.socket.connect();
    this.userService.getMyUser().subscribe(data => {
      this.usuario = data;
    })
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
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
      this.router.navigate(['/principal/perfil']);
  }

  goTorneos(){

  }

  goPartidos(){

  }

  goAmigos(){
    
  }
}
