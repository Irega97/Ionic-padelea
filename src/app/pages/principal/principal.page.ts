import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private router: Router, private menu: MenuController) { }

  ngOnInit() {
    this.userService.getMyUser().subscribe(data => {
      this.usuario = data;
    })
  }
  
  ionViewWillEnter(){
    this.userService.getMyUser().subscribe(data => {
      this.usuario = data;
    })
  }

  logout(){
    let token = localStorage.getItem('ACCESS_TOKEN');
    const t = {"token": token};
    this.http.put(environment.apiURL + '/auth/signout', t).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }

  goPerfil(){
      this.router.navigate(['/perfil']);
  }

  goTorneos(){

  }

  goPartidos(){

  }

  goAmigos(){
    
  }

}
