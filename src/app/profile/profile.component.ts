import { AuthService } from './../appServices/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  From: FormGroup;
  editMode:boolean = false;
  profileInfo;
  
   token = JSON.parse(localStorage.getItem('UserDataS'))._token;


  constructor(
    private fb:FormBuilder,
    private router:Router,    //   for url change value
    private activateRoute:ActivatedRoute,  // activated route ki value ko get karna hai from url
    private _authService:AuthService
    ) {
     // console.log(this.token);
    //  this._authService.profileInfo.subscribe(res=>{
    //    this.profileInfo = res;
    //  })
      
     }

  ngOnInit(): void {
    this.From = this.fb.group({
      name: ['Edit Name'],
      picture: ['Edit Photo']
    })

this.activateRoute.queryParamMap.subscribe(res=>{   
 // console.log(res.get('EditMode'));
 let qParam = res.get('EditMode');
 
 if(qParam != null){
   this.editMode = true;
 }else{
   this.editMode = false;
 }
})

this._authService.profileInfo.subscribe(res=>{
  this.profileInfo = res;
  this.From.setValue({
  name : res.displayName,
  picture : res.photoUrl   
  })
})



  }





  onEmpSubmit(){
    if(this.From.valid){
     // console.log(this.From.value);
 
      const uData = {token:this.token, ...this.From.value};

     this._authService.updateProfile(uData).subscribe(
       (res) => {
        console.log(res);
        this._authService.getUserData(this.token);
       },
       (err) => console.log(err)
     )

    }else {
     let key = Object.keys(this.From.controls);
     //console.log(key);
     key.filter(data =>{
       //console.log(data);
       let control = this.From.controls[data];
     //  console.log(control);
     if(control.errors !=null){
       control.markAsTouched();
     }
       
     })

    }

  }
  
 
  onDiscard(){    // on click url value change 
   // this.From.reset();
    this.router.navigate([],{queryParams:{EditMode:null}})

  }

 



}
