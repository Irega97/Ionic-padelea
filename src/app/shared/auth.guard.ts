import { ComponentsService } from './../services/components.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private component: ComponentsService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.isLoggedIn() && sessionStorage.getItem("TOKEN_EXPIRES")){
          console.log("cristian bobito");
          return true;
        }

        else{
          this.router.navigate(['auth']);
          this.component.presentAlert("Sesión caducada, inicia sesión de nuevo");
          return false;
        }
      }
    }
