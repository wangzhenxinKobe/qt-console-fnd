import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";

import {OperatorPage, Operator, OperAccount} from "./operator";
import {Role} from "../oprole/role";

@Injectable()
export class OperMngService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http:Http) {
  }

  getOperators(userName, curPage) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      userName : userName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : curPage,
      requestId : this.request_id,
      serviceCode : 'FS076'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractOperList)
      .catch(this.handleError);

  }

  private extractOperList(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new OperatorPage();

      pagedata.operators = body.fieldList as Operator[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return [true, pagedata];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }

  }

  getOperator(sysUserId) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      sysUserId : sysUserId,
      requestId : this.request_id,
      serviceCode : 'FS078'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractOperatorData)
      .catch(this.handleError);


  }

  private extractOperatorData(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {

      let oper = body as Operator;

      oper.userAccountList = body.fieldList as OperAccount[];

      console.info(oper);


      return [true, oper];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }

  }


  addOperator(oper : Operator) : Promise<[boolean, any]> {

    let acctList = [];
    for(let acct of oper.userAccountList) {

      acctList.push({
        accountId : acct.accountId
      });

    }

    let request = JSON.stringify({
      userNo : oper.userNo,
      userName : oper.userName,
      remark : oper.remark,
      roleId :oper.roleId,
      userAccountList : JSON.stringify(acctList),
      requestId : this.request_id,
      serviceCode : 'FS077'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);
  }

  editOperator(oper : Operator) : Promise<[boolean, any]>  {

    let acctList = [];
    for(let acct of oper.userAccountList) {

      acctList.push({
        sysUserId : oper.sysUserId,
        accountId : acct.accountId
      });

    }

    let request = JSON.stringify({
      userNo : oper.userNo,
      userName : oper.userName,
      userRoleList : JSON.stringify([{sysUserId : oper.sysUserId, roleId : oper.roleId}]),
      userAccountList : JSON.stringify(acctList),
      requestId : this.request_id,
      serviceCode : 'FS079'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);
  }

//删除
  removeOperator(oper : Operator) : Promise<[boolean, any]> {


    let request = JSON.stringify({
      sysUserId : oper.sysUserId,
      requestId : this.request_id,
      serviceCode : 'FS080'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<[boolean, string]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject([false, error.toString()]) ;
  }

}
