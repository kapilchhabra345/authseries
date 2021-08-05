import { map, take, timestamp } from 'rxjs/operators';
import { AuthService } from './../appServices/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {   // if we try to open dashboard. But with the help of AuthGuard redirect to login page 
  constructor(private _authService:AuthService,
    private router : Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
       return this._authService.user.pipe(    //  user  is a behavior  subject and Observable so here we can not subscribe.
         take(1),  
         map(user=>{
         //  return user? true : false;

          if(user){
            return true
          }
           return this.router.createUrlTree(['']);   // (properly redirect) createUrlTree()  is contain advance feature. (navigate) go to login page (dashboard)
         })
       )
   
      // return false;
  }
  
}
