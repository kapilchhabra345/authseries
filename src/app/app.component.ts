import { AuthService } from './appServices/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'authseries';

  constructor(private _authService:AuthService){

  }

  ngOnInit(){
   // console.log(new Date());
   // console.log(new Date().getTime());
  // let expiresIn=5000;
   //console.log(new Date().getTime()+ expiresIn*1000);
  // console.log(new Date(new Date().getTime()+ expiresIn*1000));

   
    
    this._authService.autoSignIn();
  }

}
