import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentsService } from '../services/components.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router, private component: ComponentsService, private userService: UserService){}
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (localStorage.getItem("ACCESS_TOKEN") != null){
        this.userService.getMyUser();
        return true;
      }

      else{
        this.router.navigate(['auth']);
        this.component.presentAlert("Inicia sesión para acceder");
        return false;
      }
  }
  
}
