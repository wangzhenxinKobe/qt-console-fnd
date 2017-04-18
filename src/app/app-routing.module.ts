import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StrategyComponent} from "./strategy/strategy.component";
import {FuturesComponent} from "./futures/futures.component";
import {MarketDataComponent} from "./market-data/market-data.component";


const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//  { path: 'dashboard',  component: DashboardPageComponent }
//  { path: '', redirectTo: '/strategy', pathMatch: 'full' },
  { path: 'strategy',  component: StrategyComponent },
  { path: 'market-data',  component: MarketDataComponent },
  { path: 'futures',  component: FuturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

