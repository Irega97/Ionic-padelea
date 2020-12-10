import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
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
    
      if (localStorage.getItem("ACCESS_TOKEN") != null){
        console.log("cristian tontito");
        return true;
      }

      else{
        this.router.navigate(['auth']);
        this.component.presentAlert("Inicia sesión para acceder");
        return false;
      }
  }
  
}
