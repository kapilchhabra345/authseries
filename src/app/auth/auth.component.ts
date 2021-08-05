import { ErrorService } from './../appServices/error.service';
import { AuthService } from './../appServices/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode:boolean = true;
  myReactiveForm:FormGroup;     //  FormGroup is a type
  error;
// errMsgs = this._errService.errorsMsgs;
  
  constructor(private fb:FormBuilder,
             private _authService:AuthService,
             private _errService:ErrorService,
             private router:Router,
             private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    // first way
    // this.myReactiveForm = new FormGroup({
    //   'email': new FormControl('',[Validators.required,Validators.email]),
    //   'password':new FormControl('',Validators.required)
    // })
  
    // second way
 
    this._authService.user.subscribe(res=>{ // if user login hai to redirect to dashboard
      if(res){
        this.router.navigate(['/dashboard'])
      }
    })

    this.myReactiveForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(6)]]
    })
  }

   onSwitchMode(){
     this.loginMode = !this.loginMode;
   }


  onSubmit(){
  
    if(this.myReactiveForm.valid){
      console.log(this.myReactiveForm);
  
      const email = this.myReactiveForm.value.email;
      const password = this.myReactiveForm.value.password;

  let authObservable : Observable<AuthResponse>;

      if(this.loginMode)
      { 
        //login mode
        authObservable = this._authService.signIn(email,password)
      }else{
        //signUp
        authObservable =  this._authService.signUp(email,password)
      }

      authObservable.subscribe(res => {
        console.log(res);
        this.router.navigate(['dashboard'])
      },
      err =>{
        console.log(err);
        //  this.error = err.error.error.message;
       // this.error =  this.errMsgs[err.error.error.message];
     
        //  if(!err.error || !err.error.error)
        //   {
        //     this.error = this.errMsgs['UNKNOWN']
        //   }
        //   else{
        //     this.error =  this.errMsgs[err.error.error.message];
        //   }
       // this.error = this.errMsgs[err];
          this.error = err;
      })
    }
    else{
        //..
    }

   }


   onGoogleSignIn(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user)=>{
        this._authService.googleSignIn(user.idToken).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['dashboard']);
          },
          (err) => {
            console.log(err);
          }
        )
        
      }
    );
   }



}
