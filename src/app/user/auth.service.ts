import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Authority} from "./user";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class AuthService {

  private loginStatusSource = new Subject<boolean>();

  loginStatus$ = this.loginStatusSource.asObservable();

  private isLogedIn : boolean = false;
  private tokenId : string;

  authorities : Authority[] = null;

  constructor(private cookieService : CookieService){}

  sendLoginStatus(status : boolean) {

    this.isLogedIn = status;
    this.loginStatusSource.next(status);

  }

  getLoginStatus() {
    return this.isLogedIn;
  }

  setTokenId(tokenId : string) {

    this.cookieService.put('qt-console-cookie-tokenid', tokenId);
    this.tokenId = tokenId;

  }

  getTokenId() {

    this.tokenId = this.cookieService.get('qt-console-cookie-tokenid');
    return this.tokenId;

  }

}
