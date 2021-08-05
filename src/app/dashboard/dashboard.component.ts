import { AuthService } from './../appServices/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignUtilityService } from './../appServices/design-utility.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listViewActive = false;
  showModal = false;
  empForm:FormGroup;
  empData;
  user;
 

   
  constructor(private _designUtility:DesignUtilityService,
              private fb:FormBuilder,
              private _authService:AuthService) {
                this._authService.profileInfo.subscribe(res=>{
                  this.user = res;
                })
               }

  ngOnInit(): void {
   this.onGetUsers();
     this.empForm=this.fb.group({
      name : ['', Validators.required],
      designation : ['',Validators.required],
    //  dept : ['Department',Validators.required],
      //status: ['Active'],
     })
  }

  onSubmit(){
    if(this.empForm.valid)
  {
    console.log(this.empForm);
  //const name= this.empForm.value.name;
  //const designation= this.empForm.value.designation;
     
   this._designUtility.saveData(this.empForm.value).subscribe(res=>{
    console.log(res); 
    this.onGetUsers();
   });
   this.empForm.reset({
     dept: 'Development',
     status: 'Active',
   });    
  }
}

  onGetUsers(){
     this._designUtility.fetchData()
     .subscribe(
       (response)=>{
           const data = JSON.stringify(response);
           this.empData =response;
          //console.log(data);
           // this.empData = response;
           // console.log(this.empData);
            
     },
     (err) => console.log(err)
     )

  }




}
