import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: User;

  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private router: Router, private menu: MenuController) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    else{
      this.userService.getMyUser().subscribe(data => {
        this.usuario = data;
        console.log(data);
      })
    }
  }

  modificar(){}

  back(){
    this.router.navigate(['/principal']);
  }
}
