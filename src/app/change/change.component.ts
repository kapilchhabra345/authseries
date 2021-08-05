import { AuthService } from './../appServices/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  token = JSON.parse(localStorage.getItem('UserDataS'))._token;
 
 
 success:boolean = false;

  constructor(
    private fb:FormBuilder,
    private _authService:AuthService) { }
    

From : FormGroup;

  ngOnInit(): void {
    this.From = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(6)]]

    })
  }

  onSubmit(){
    if(this.From.valid){
       // console.log(this.From.value);
      //  console.log(this.From.value.password);
     //   console.log(this.token);
    //    console.log({idToken:this.token});
    //console.log({idToken:this.token, ...this.From.value});
    const data = {idToken:this.token, ...this.From.value};
    this._authService.changePassword(data).subscribe(res=>{
       console.log(res);
       this.success = true;
      })
    }
    else{
     let key = Object.keys(this.From.controls);
     key.filter(data=>{
       let control = this.From.controls[data];
       if(control.errors !=null){
        control.markAsTouched();
       }
     })

    }
  }



}
