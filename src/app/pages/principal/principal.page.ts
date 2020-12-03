import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuarios: User[];
  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.usuarios = data
    })
  }
  
  ionViewWillEnter(){
    this.userService.getUsers().subscribe(data => {
      this.usuarios = data
    })
  }

  logout(){
    let token = localStorage.getItem('token');
    const t = {"token": token};
    this.http.put(environment.apiURL + '/auth/signout', t).subscribe(() => {
      localStorage.clear();
      this.router.navigateByUrl('');
    })
  }

}
