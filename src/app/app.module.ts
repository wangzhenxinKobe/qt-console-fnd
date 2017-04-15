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

import {StrategyInMemoryDataService} from "./mock/strategy-in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api/in-memory-web-api.module";
import {PaginationComponent} from "./elements/pagination.component";
import { FuturesComponent } from './futures/futures.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StrategyComponent,
    StrategyEditorComponent,
    PaginationComponent,
    FuturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    InMemoryWebApiModule.forRoot(StrategyInMemoryDataService)


  ],
  providers: [ StrategyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
