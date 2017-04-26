import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StrategyComponent} from "./strategy/strategy.component";
import {FuturesComponent} from "./futures/futures.component";
import {MarketDataComponent} from "./market-data/market-data.component";
import {TradeUnitComponent} from "./trade-unit/trade-unit.component";
import {BusinessComponent} from "./business.component";
import {TdServiceComponent} from "./tdService/tdService.component";
import {MdServiceComponent} from "./mdService/mdService.component";
import {AccountComponent} from "./account/account.component";
import {TplatformComponent} from "./tplatform/tplatform.component";
import {SysfuncComponent} from "./sysfunc/sysfunc.component";
import {BinfoComponent} from "./binfo/binfo.component";
import {SindexComponent} from "./sindex/sindex.component";
import {SbasketComponent} from "./sbasket/sbasket.component";
import {AgroupComponent} from "./agroup/agroup.component";
import {OproleComponent} from "./oprole/oprole.component";
import {OproleDetailComponent} from "./oprole/oprole-detail.component";


const childrenRoutes: Routes = [
  { path: 'strategy',  component: StrategyComponent },
  { path: 'market-data',  component: MarketDataComponent },
  { path: 'futures',  component: FuturesComponent },
  { path: 'trade-unit',  component: TradeUnitComponent },
  { path: 'tdService',  component: TdServiceComponent },
  { path: 'mdService',  component: MdServiceComponent },
  { path: 'account',  component: AccountComponent },
  { path: 'tplatform',  component: TplatformComponent },
  { path: 'sysfunc',  component: SysfuncComponent },
  { path: 'binfo',  component: BinfoComponent },
  { path: 'sindex',  component: SindexComponent },
  { path: 'sbasket',  component: SbasketComponent },
  { path: 'agroup',  component: AgroupComponent },
  { path: 'oprole',  component: OproleComponent },
  { path: 'oprole-detail',  component: OproleDetailComponent }
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

