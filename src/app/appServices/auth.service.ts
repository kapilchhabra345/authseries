import { Router } from '@angular/router';
import { User } from './../appModels/user.model';
import { ErrorService } from './error.service';
import { AuthResponse } from './../appInterface/auth-response.interface';
import { config } from './../../../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, timeout } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
    //user = new Subject<User>();    // create subject of User
    user = new BehaviorSubject<User>(null);    // BehaviorSubject is use for initial value
    profileInfo = new BehaviorSubject({
      displayName:'',
      email:'',
      photoUrl:''
    });

    
    private tokenExpirationTimer : any;

  constructor(private http: HttpClient, 
              private _errService:ErrorService,
              private router:Router                                   ) { 
             //   this.autoSignIn();
              }

  signUp(email, password){
   // this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+config.API_KEY)
  return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{
    email:email,
    password: password,
    returnSecureToken:true
   }).pipe(
    catchError(err => {
      return this._errService.handleError(err)
    }),
    tap(res=>{
         this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn) 
    })
     )
  
  }


  signIn(email, password){
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{
     email:email,
     password: password,
     returnSecureToken:true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      }),
      tap(res=>{    //  hamare es response ko change nahi karta hai
           this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn) 
      })
       )
   }

   autoSignIn(){    // autoSignIn() use for refresh* condition and get value from local storage
     const userData = JSON.parse(localStorage.getItem('UserData'));  
   //  console.log(userData);

   if(!userData){
     return;
   }
   const loggedInUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate))
    if(loggedInUser.token) {  // agar user login
   this.user.next(loggedInUser);    // again (Storing Data in user Subject) (store data in app) Authanticated user emit data into User Subject  

   const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
   this.autoSignOut(expirationDuration);
   this.getUserData(loggedInUser.token);
   
    }
   }

 signOut(){
   this.user.next(null);   // clear user subject data
    this.router.navigate(['']);   //  redirect to login page. '' empty route this is login page, (remove store data in app)  
    localStorage.removeItem('UserData'); // remove data from local storage

    if(this.tokenExpirationTimer){   // when click signOut() then call automatically tokenExpirationTimer property
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
 }


 autoSignOut(expirationDuration:number){   //  autoSignOut function will call two places. (1. authenticatedUser(), 2. autoSignIn()
this.tokenExpirationTimer = setTimeout(()=>{    // setTimeout ek time ke baad automatically call
  this.signOut();  
},expirationDuration);
 }


  private authenticatedUser(email, id, _token, expiresIn){   
    const expirationDate = new Date(new Date(new Date().getTime() + expiresIn*1000))
     const userModel = new User(email, id, _token, expirationDate); // store data of every user in user model by using constructor
    // console.log('user =>', userModel);
     this.user.next(userModel);   // (Storing Data in user Subject) (store data in app) Authanticated user emit data into User Subject  
     this.autoSignOut(expiresIn*1000);
    
     localStorage.setItem('UserData',JSON.stringify(userModel));    // (refresh*) aplication tab into inspect (store data in local storage) local storage hamari app se bahar mantain rahati hi
     this.getUserData(_token);

  }

  updateProfile(data){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
    {
      idToken:data.token,
      displayName:data.name,
      photoUrl:data.picture,
      returnSecureToken:true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
       )
  }

  
  getUserData(token){
    this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.API_KEY}`,
      {
        idToken:token
      } 
      ).subscribe(res=>{
        // console.log({
        //   displayName:res.user[0].displayName,
        //   email:res.user[0].email,
        //   photoUrl:res.user[0].photoUrl
        // });


        this.profileInfo.next({
          displayName:res.users[0].displayName,
          email:res.users[0].email,
          photoUrl:res.users[0].photoUrl

        })
        
      })
  }


  changePassword(dataP){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`,
    {
      idToken:dataP.idToken,
      password:dataP.password,
      returnSecureToken:true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
       )
  }


  forgetPassword(dataF){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`,{
      requestType:'PASSWORD_RESET',
      email:dataF.email
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      })
       )
  }

  googleSignIn(nidToken){
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.API_KEY}`,{
      postBody:`id_token=${nidToken}&providerId=google.com`,
      requestUri:'http://localhost:4200',
      returnIdpCredential:true,
      returnSecureToken:true
    }).pipe(
      catchError(err => {
        return this._errService.handleError(err)
      }),
      tap(res=>{    //  hamare es response ko change nahi karta hai
           this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn) 
      })
       )

  }



}