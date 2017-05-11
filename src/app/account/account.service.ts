import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Account,AccountPage} from "./account";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";

@Injectable()
export class AccountService {
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

  //查询
  getAccountPage(accountId,currentPage) : Promise<AccountPage> {

    let request = JSON.stringify({

      accountId : accountId,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS046'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractAccountPage)
      .catch(this.handleError);

  }
  //查询返回参数
  private extractAccountPage(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new AccountPage();

      pagedata.account = body.fieldList as Account[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }



  getAccountsInOnePage(accountId) : Promise<Account[]> {

    let request = JSON.stringify({

      accountId : accountId,
      pageSize : 1000,
      currentPage : 1,
      requestId : this.request_id,
      serviceCode : 'FS046'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(res => {

        let body = res.json();

        if(body.errCode == '000000') {

          return body.fieldList as Account[];

        } else {

          console.error("请求失败：" + body.errMsg);
          return null;

        }

      }).catch(this.handleError);

  }



  //增加
  addAccount(account : Account) : Promise<boolean> {

    let request = JSON.stringify({
      accountId : account.accountId, //测试ID
      platId : account.platId,    //平台ID
      requestId : this.request_id,
      serviceId :account.serviceId,    //服务编号
      userId : account.userId,
      fundCode : account.fundCode,   //产品编号
      commAccount : account.commAccount,
      commPassword : account.commPassword,
      flowPath : account.flowPath,
      isauth : account.isauth,
      userProductInfo : account.userProductInfo,
      inverstorId : account.inverstorId,
      tradePassword : account.tradePassword,
      ratio : account.ratio,
      groupId : account.groupId,
      serviceCode : 'FS047'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return true ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return false;
        }

      })
      .catch(this.handleError);
  }


  //修改
  updateAccount(account : Account) : Promise<boolean> {


    let request = JSON.stringify({

      accountId : account.accountId,
      platId : account.platId,    //平台ID
      requestId : this.request_id,
      serviceId :account.serviceId,    //服务编号
      userId : account.userId,
      fundCode : account.fundCode,   //产品编号
      commAccount : account.commAccount,
      commPassword : account.commPassword,
      flowPath : account.flowPath,
      isauth : account.isauth,
      userProductInfo : account.userProductInfo,
      inverstorId : account.inverstorId,
      tradePassword : account.tradePassword,
      ratio : account.ratio,
      groupId : account.groupId,
      serviceCode : 'FS049'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {
        console.info(res);
        let body = res.json();
        if(body.errCode == '000000') {
          return true ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return false;
        }

      })
      .catch(this.handleError);
  }

//删除
  removeAccount(account : Account) : Promise<boolean> {


    let request = JSON.stringify({
      accountId : account.accountId,
      requestId : this.request_id,
      serviceCode : 'FS050'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return true ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return false;
        }

      })
      .catch(this.handleError);


  }







  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
