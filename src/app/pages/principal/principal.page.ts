import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user'


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuarios: User[];
  constructor(public authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => {
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
