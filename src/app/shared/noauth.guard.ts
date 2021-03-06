import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivateChild {

  constructor(private router: Router){}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem("ACCESS_TOKEN") != null){
        this.router.navigate(['principal'])
          return false;
        }

        else{
          return true;
        }
  }
  
}
