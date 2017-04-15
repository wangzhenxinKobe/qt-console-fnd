import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StrategyComponent} from "./strategy/strategy.component";


const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//  { path: 'dashboard',  component: DashboardPageComponent }
  { path: '', redirectTo: '/strategy', pathMatch: 'full' },
  { path: 'strategy',  component: StrategyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

