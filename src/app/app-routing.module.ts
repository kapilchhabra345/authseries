import { ForgetComponent } from './forget/forget.component';
import { ChangeComponent } from './change/change.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 {path : '', component : AuthComponent},  // '' empty route this is login page
 {path : 'dashboard', canActivate:[AuthGuard], component : DashboardComponent},
 {path : 'profile', component : ProfileComponent},
 {path : 'change-password', component : ChangeComponent},
 {path : 'forget-password', component : ForgetComponent}


 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
