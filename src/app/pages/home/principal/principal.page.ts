import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private router: Router, private menu: MenuController,
    private events: RefreshService) { }

  ngOnInit() {
    this.userService.getMyUser().subscribe(data => {
      this.usuario = data;
    })
    this.events.getObservable().subscribe((data)=> {
      console.log(data);
      if (data.topic == "updateUser") {
        this.usuario = data.user;
      }
    })
  }

  logout(){
    this.authService.signout().subscribe(data =>{
      localStorage.clear();
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
