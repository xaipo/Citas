import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
