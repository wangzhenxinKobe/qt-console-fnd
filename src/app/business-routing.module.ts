import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StrategyComponent} from "./strategy/strategy.component";
import {FuturesComponent} from "./futures/futures.component";
import {MarketDataComponent} from "./market-data/market-data.component";
import {TradeUnitComponent} from "./trade-unit/trade-unit.component";
import {BusinessComponent} from "./business.component";


const childrenRoutes: Routes = [
  { path: 'strategy',  component: StrategyComponent },
  { path: 'market-data',  component: MarketDataComponent },
  { path: 'futures',  component: FuturesComponent },
  { path: 'trade-unit',  component: TradeUnitComponent }
];

const businessRoutes : Routes = [{

  path: 'buz',
  component: BusinessComponent,
  children: childrenRoutes

}];

@NgModule({
  imports: [RouterModule.forChild(businessRoutes)],
  exports: [RouterModule],
  providers: []
})
export class BusinessRoutingModule { }

