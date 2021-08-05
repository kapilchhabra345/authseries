// complete coding is write itself

import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './../appServices/auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';

@Injectable()


  export class AuthInterceptor implements HttpInterceptor {  // automatically with every http request token* add with the help of AuthInterceptor(). like insert, update, delete, fetch data etc.  
   constructor(private _authService:AuthService){
   }
   intercept(req:HttpRequest<any>, next:HttpHandler){
       return this._authService.user.pipe(
           take(1),
           exhaustMap(user=>{
               if(!user){      // agar user login nahi hai to ye request jayegi
                return next.handle(req);
               }
               const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
               })
            return next.handle(modifiedReq);    // agar user login hai to ye request jayegi

           })
           )
   }
}