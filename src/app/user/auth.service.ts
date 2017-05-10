import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Authority} from "./user";
import {Cookie} from "ng2-cookies/ng2-cookies";

@Injectable()
export class AuthService {

  private loginStatusSource = new Subject<boolean>();

  loginStatus$ = this.loginStatusSource.asObservable();

  private isLogedIn : boolean = false;
  private tokenId : string;

  authorities : Authority[] = null;

  constructor(){}

  sendLoginStatus(status : boolean) {

    this.isLogedIn = status;
    this.loginStatusSource.next(status);

  }

  getLoginStatus() {
    return this.isLogedIn;
  }

  setTokenId(tokenId : string) {

    Cookie.set('qt-console-cookie-tokenid', tokenId);
    this.tokenId = tokenId;

  }

  getTokenId() {

    this.tokenId = Cookie.get('qt-console-cookie-tokenid');
    return this.tokenId;

  }

  clearTokenId() {
    this.tokenId = '';
    Cookie.delete('qt-console-cookie-tokenid');

  }

}
