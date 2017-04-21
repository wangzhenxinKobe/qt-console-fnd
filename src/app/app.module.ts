import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {InterceptorService} from "ng2-interceptors/index";
import { Http, XHRBackend, RequestOptions } from '@angular/http';

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
import {CustSelectComponent} from "./elements/cust-select.component";
import { TradeUnitComponent } from './trade-unit/trade-unit.component';
import {TradeUnitService} from "./trade-unit/trade-unit.service";
import { LoginComponent } from './login.component';
import {HttpInterceptor} from "./common/http.interceptor";
import {AuthService} from "./auth.service";


export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, httpInterceptor: HttpInterceptor){ // Add it here

  let service = new InterceptorService(xhrBackend, requestOptions);

  service.addInterceptor(httpInterceptor); // Add it here

  return service;

}


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
    TradeUnitComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule

  ],
  providers: [ StrategyService, MarketDataService, TradeUnitService, HttpInterceptor, AuthService,

    {
      provide: Http,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, HttpInterceptor]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
