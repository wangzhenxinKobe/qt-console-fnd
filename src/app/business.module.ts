import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BusinessRoutingModule} from "./business-routing.module";

import {StrategyService} from "./strategy/strategy.service";
import {MarketDataService} from "./market-data/market-data.service";
import {TradeUnitService} from "./trade-unit/trade-unit.service";

import {StrategyComponent} from "./strategy/strategy.component";
import {StrategyEditorComponent} from "./strategy/strategy-editor.component";
import {PaginationComponent} from "./elements/pagination.component";
import { FuturesComponent } from './futures/futures.component';
import { MarketDataComponent } from './market-data/market-data.component';
import {CustSelectComponent} from "./elements/cust-select.component";
import { TradeUnitComponent } from './trade-unit/trade-unit.component';
import {BusinessComponent} from "./business.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AlertComponent} from "./elements/alert.component";


@NgModule({
  declarations: [
    BusinessComponent,
    NavbarComponent,
    StrategyComponent,
    StrategyEditorComponent,
    PaginationComponent,
    FuturesComponent,
    MarketDataComponent,
    CustSelectComponent,
    TradeUnitComponent,
    AlertComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BusinessRoutingModule

  ],
  providers: [ StrategyService, MarketDataService, TradeUnitService ]

})
export class BusinessModule { }
