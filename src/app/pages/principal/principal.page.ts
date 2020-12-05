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

  usuario = new User("", "", "");
  usuarios: User[];
  error;
  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private router: Router, private menu: MenuController) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    else{
      this.userService.getMyUser().subscribe(data => {
        this.usuario = data;
      })
    }
  }
  
  ionViewWillEnter(){
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    else{
      this.userService.getMyUser().subscribe(data => {
        this.usuario = data;
      })
    }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  logout(){
    let token = localStorage.getItem('ACCESS_TOKEN');
    const t = {"token": token};
    this.http.put(environment.apiURL + '/auth/signout', t).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }

}
