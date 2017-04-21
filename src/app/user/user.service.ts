import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User} from "./user";
import {AuthService} from "../common/auth.service";

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private user : User = null;

  constructor(
    private http: Http,
    private authService : AuthService
  ) { }

  getUser() {

    if( this.user ) return this.user;

    //TODO:用户信息为空，向服务端获取用户信息
    return null;

  }

  // 登陆
  login(account : string, password : string, chkCode : string) {

    this.user = {id: '1233232', name : 'gavin'};

    this.authService.sendLoginStatus(true);

    return true;

    /*
     return this.http.post(this.url_authLogin,
     JSON.stringify({account:account,password:password}))
     .toPromise()
     .then(response => response.json().data as User  )
     .catch(this.handleError);
     */

  }

  // 注销
  logout(userId: string) {

    /*
     return this.http.post(this.url_authLogout,
     JSON.stringify({userId:userId}), {headers: this.headers})
     .toPromise()
     .then(() => null)
     .catch(this.handleError);
     */
  }

  private handleError(error: any): Promise<any> {
    console.error('发生错误', error);
    return Promise.reject(error.message || error);
  }

}
