import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./user/login.component";
import {BusinessComponent} from "./business.component";


const routes: Routes = [
  { path: 'business',  component: BusinessComponent },
  { path: 'login',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

