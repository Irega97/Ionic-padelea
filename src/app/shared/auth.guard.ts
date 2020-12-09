import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ComponentsService } from '../services/components.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private component: ComponentsService){}
  
  canActivateChild(
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
