import { AuthService } from './../appServices/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  user;

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
   this._authService.user.subscribe(res=>{
     // first way
    //  if(res){
    //    this.isLoggedIn =  true;
    //  }else{
    //    this.isLoggedIn = false;
    //  }

   // second way
   //  this.isLoggedIn = !res ? false : true;

    // third way
    this.isLoggedIn = !!res;

   });

   this._authService.profileInfo.subscribe(res=>{
    this.user = res;
  })

  }

 
  onSignOut(){
    this._authService.signOut();
  }


}
