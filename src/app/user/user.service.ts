import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User, Authority} from "./user";
import {AuthService} from "./auth.service";
import {generateRequestId} from "../app.module";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class UserService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers([{'Content-Type': 'application/json'}, {'tokenid':'xxxx'}]);

  private user : User = null;
  private request_id : string;

  constructor(
    private http: Http,
    private authService : AuthService
  ) { }

  getUser() : Promise<[boolean, any]> {

    if( this.user ) return Promise.resolve([true, this.user]);

    let tokenId = this.authService.getTokenId();
    if( !tokenId ) return Promise.reject('TokenId失效');

    this.request_id = generateRequestId();

    //用户信息为空，向服务端获取用户信息
    let request = JSON.stringify({

      tokenId : tokenId,
      requestId : this.request_id,
      serviceCode : 'FS101'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

        if(body.errCode == '000000') {

          //获取用户及权限信息
          this.user = new User();
          this.user.userName = body.userName;
          this.user.userNo = body.userNo;

          this.authService.authorities = body.fieldList as Authority[];

          if(!this.authService.authorities || this.authService.authorities.length == 0) {

            console.error("请求失败：用户权限为空");
            return [false, "请求失败：用户权限为空"];

          }

          //设置登录信息
          this.authService.sendLoginStatus(true);

          return [true, this.user];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

  }

  getChkCodeRequest() : string {

    this.request_id = generateRequestId();

    return `${ParamConfig.HTTP_CHKCODE_URL}?requestId=${this.request_id}&serviceCode=FS102`;

  }

  // 登陆
  login(account : string, password : string, chkCode : string) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      userNo : account,
      password : password,
      code : chkCode,
      originRequestId : this.request_id,
      requestId : this.request_id,
      serviceCode : 'FS093'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

        if(body.errCode == '000000') {

          //获取用户及权限信息
          this.user = new User();
          this.user.userName = body.userName;
          this.user.userNo = body.userNo;

          this.authService.authorities = body.fieldList as Authority[];

          if(!this.authService.authorities || this.authService.authorities.length == 0) {

            console.error("请求失败：用户权限为空");
            return [false, "请求失败：用户权限为空"];

          }

          //设置登录信息
          this.authService.setTokenId(body.tokenId);
          this.authService.sendLoginStatus(true);

          return [true, "success"];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

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

  private handleError(error: any): Promise<[boolean, any]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject([false, error.toString()]);
  }

}
