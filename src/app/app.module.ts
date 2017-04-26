import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {InterceptorService} from "ng2-interceptors/index";
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import {BusinessModule} from "./business.module";
import {AppRoutingModule} from "./app-routing.module";

import {HttpInterceptor} from "./common/http-interceptor.service";

import {AuthService} from "./user/auth.service";
import {UserService} from "./user/user.service";

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login.component';
import {CookieService} from "angular2-cookie/core";

export function generateRequestId() {

  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < 32; i++) {
    //0~32的整数
    pwd += chars.charAt(Math.floor(Math.random() * (maxPos+1)));
  }
  return pwd;

}

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, httpInterceptor: HttpInterceptor){ // Add it here

  let service = new InterceptorService(xhrBackend, requestOptions);

  service.addInterceptor(httpInterceptor); // Add it here

  return service;

}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BusinessModule,
    AppRoutingModule

  ],
  providers: [ CookieService, HttpInterceptor, AuthService, UserService,
    {
      provide: Http,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, HttpInterceptor]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
