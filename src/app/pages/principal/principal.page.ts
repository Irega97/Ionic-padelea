import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
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
