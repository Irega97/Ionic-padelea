import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService) { }

  ngOnInit() {
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
      this.events.disconnectSocket(this.usuario.username);
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
