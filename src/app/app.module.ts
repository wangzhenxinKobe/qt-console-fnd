import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {StrategyComponent} from "./strategy/strategy.component";
import {StrategyEditorComponent} from "./strategy/strategy-editor.component";
import {StrategyService} from "./strategy/strategy.service";

import {PaginationComponent} from "./elements/pagination.component";
import { FuturesComponent } from './futures/futures.component';
import { MarketDataComponent } from './market-data/market-data.component';
import {MarketDataService} from "./market-data/market-data.service";
import {CustSelectComponent} from "./elements/cust-select.component.ts";
import { TradeUnitComponent } from './trade-unit/trade-unit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StrategyComponent,
    StrategyEditorComponent,
    PaginationComponent,
    FuturesComponent,
    MarketDataComponent,
    CustSelectComponent,
    TradeUnitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

  ],
  providers: [ StrategyService, MarketDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
