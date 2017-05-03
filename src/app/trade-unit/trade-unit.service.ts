import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {TradeUnitPage, TradeUnit, TradeUnitParam, TradeUnitAcct} from "./trade-unit";
import {generateRequestId} from "../app.module";

@Injectable()
export class TradeUnitService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) {}

  getTradeUnits(pladId, strategyName, tradeUnitName, curPage) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      platId : pladId,
      tradeUnitId : tradeUnitName,
      strategyName : strategyName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : curPage,
      requestId : this.request_id,
      serviceCode : 'FS051'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractTradeUnitsData)
      .catch(this.handleError);

  }

  private extractTradeUnitsData(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new TradeUnitPage();

      pagedata.tradeUnits = body.fieldList as TradeUnit[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return [true, pagedata];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }

  }

  getTrandUnit(tradeUnitId : string) : Promise<[boolean, any]> {

    let request = JSON.stringify({
      tradeUnitId : tradeUnitId,
      requestId : this.request_id,
      serviceCode : 'FS053'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, body as TradeUnit] ;

        } else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);
  }

  /**
   *
   * @param tradeUnit
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
   */
  addTradeUnit(tradeUnit : TradeUnit) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let request = JSON.stringify({
      tradeUnitId : tradeUnit.tradeUnitId,
      platId : tradeUnit.platId,
      strategyName : tradeUnit.strategyName,
      author : tradeUnit.author,
      requestId : this.request_id,
      serviceCode : 'FS052'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, this.request_id] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @param params
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  updateTradeUnitParam(tradeUnitId : string, params : TradeUnitParam[]) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let paramList = [];
    for(let param of params) {

      paramList.push({
        key : param.paraName,
        value : param.paraValue,
        type : param.paraType,
        len : 10,
        comment : param.comment,
        defaultValue : param.defaultValue
      });

    }

    let request = JSON.stringify({

      tradeUnitID : tradeUnitId,
      list : JSON.stringify(paramList),
      requestId : this.request_id,
      serviceCode : 'FS082'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  deleteTradeUnit(tradeUnitId :string) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let request = JSON.stringify({
      tradeUnitID : tradeUnitId,
      requestId : this.request_id,
      serviceCode : 'FS081'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  startTradeUnit(tradeUnitId :string) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let request = JSON.stringify({
      tradeUnitId : tradeUnitId,
      requestId : this.request_id,
      serviceCode : 'FS085'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  stopTradeUnit(tradeUnitId :string) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let request = JSON.stringify({
      tradeUnitId : tradeUnitId,
      requestId : this.request_id,
      serviceCode : 'FS086'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @param acctList
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  addTradeUnitAccounts(tradeUnitId : string, acctList : TradeUnitAcct[]) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let inputAcctList = [];
    for(let acct of acctList) {
      inputAcctList.push({accountId : acct.userId, type : acct.accountType});
    }

    let request = JSON.stringify({

      tradeUnitId : tradeUnitId,
      list : JSON.stringify(inputAcctList),
      requestId : this.request_id,
      serviceCode : 'FS091'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

  }

  /**
   *
   * @param tradeUnitId
   * @param acctList
   * @returns Promise<[boolean, any]> 如果成功，第一个参数为true，第二个参数为request_id
     */
  deleteTradeUnitAccounts(tradeUnitId : string, acctList : TradeUnitAcct[]) : Promise<[boolean, any]> {

    this.request_id = generateRequestId(); //需要重新生成request_id

    let inputAcctList = [];
    for(let acct of acctList) {
      inputAcctList.push({accountId : acct.userId, type : acct.accountType});
    }

    let request = JSON.stringify({

      tradeUnitId : tradeUnitId,
      list : JSON.stringify(inputAcctList),
      requestId : this.request_id,
      serviceCode : 'FS092'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, this.request_id] ;

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

  }

  /**
   * 向服务端获取异步应答
   * @param request_id
   * @returns
   */
  public getServerResponse(request_id) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      requestId : request_id,
      serviceCode : 'FS000'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, "success"];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      }).catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.toString);
  }

}
