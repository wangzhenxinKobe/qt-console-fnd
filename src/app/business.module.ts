import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule }     from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';

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
import {AccountComponent} from "./account/account.component";
import {AccountService} from "./account/account.service";
import {BinfoComponent} from "./binfo/binfo.component";
import {BinfoService} from "./binfo/binfo.service";
import {FuturesService} from "./futures/futures.service";
import {MdServiceComponent} from "./mdService/mdService.component";
import {MdServiceService} from "./mdService/mdService.service";
import {SbasketComponent} from "./sbasket/sbasket.component";
import {SbasketService} from "./sbasket/sbasket.service";
import {SindexComponent} from "./sindex/sindex.component";
import {SindexService} from "./sindex/sindex.service";
import {SysfuncComponent} from "./sysfunc/sysfunc.component";
import {SysfuncService} from "./sysfunc/sysfunc.service";
import {TdServiceComponent} from "./tdService/tdService.component";
import {TdServiceService} from "./tdService/tdService.service";
import {TplatformComponent} from "./tplatform/tplatform.component";
import {TplatformService} from "./tplatform/tplatform.service";
import {OproleComponent} from "./oprole/oprole.component";
import {OproleService} from "./oprole/oprole.service";
import {OproleDetailComponent} from "./oprole/oprole-detail.component";


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
    AlertComponent,
    AccountComponent,
    BinfoComponent,
    MdServiceComponent,
    SbasketComponent,
    SindexComponent,
    SysfuncComponent,
    TdServiceComponent,
    TplatformComponent,
    OproleComponent,
    OproleDetailComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    FileUploadModule,
    BusinessRoutingModule

  ],
  providers: [ StrategyService, MarketDataService, TradeUnitService, AccountService, BinfoService, FuturesService, MdServiceService,
    SbasketService, SindexService, SysfuncService, TdServiceService, TplatformService, OproleService
  ]

})
export class BusinessModule { }
