import { AuthService } from '../appServices/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _authService:AuthService
  ) { }

  forgetForm : FormGroup;
  error:any = null;
  success:boolean = false;

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })  
  }

  onForgetSubmit(){
    if(this.forgetForm.valid){
     // console.log('hi');
     console.log(this.forgetForm.value);
     this._authService.forgetPassword(this.forgetForm.value).subscribe(
     (res) => {
       console.log(res);
       this.success = true;
     },
     (err) =>{
      console.log(err);
      this.error = err;
     } )
    }else{
    let key = Object.keys(this.forgetForm.controls);
    key.filter(data=>{
      let control = this.forgetForm.controls[data];
      if(control.errors !=null){
       control.markAsTouched();
      }
    })
  }
  }
}

