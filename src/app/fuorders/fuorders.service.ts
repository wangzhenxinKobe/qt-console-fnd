import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {Fuorders, Instrument, FuordersAccount,FuordersFunc} from "./fuorders";
import {generateRequestId} from "../app.module";
import Any = jasmine.Any;
import {AccountPage, Account} from "../account/account";

@Injectable()
export class FuordersService {
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }


  //查询账户
  getFuorders(): Promise<[boolean, any]>{
let request = JSON.stringify({

  requestId : this.request_id,
  serviceCode : 'FS121'
});
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.FuordersList)
      .catch(this.handleError);
  }
  private FuordersList(res : Response){

    let body = res.json();

    if(body.errCode == '000000'){

      return [true, body.fieldList as FuordersAccount[]];

    }else{
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }

//手动下单
  addFuorders(fuorders : Fuorders,symbol : String ) : Promise<[boolean ,any]> {
    let fuoList = [];
    for(let fuo of fuorders.rgAccountDTOlist) {
      fuoList.push({
        accountId : fuo.accountId
      });
    };
    let request = JSON.stringify({
      rgAccountDTOlist : JSON.stringify(fuoList),
      symbol : symbol,
      exchange : fuorders.exchange,
      direction : fuorders.direction,
      offset : fuorders.offset,
      hedge : fuorders.hedge,
      entrustPrice : fuorders.entrustPrice,
      entrustVolume : fuorders.entrustVolume,
      orderTradeType : fuorders.orderTradeType,
      tradeUnitId : "Manual",
      requestId : this.request_id,
      serviceCode : 'FS056'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.addFuordersData)
      .catch(this.handleError);

  }
  //添加返回结果
  private addFuordersData	(res : Response) : Promise<[boolean ,any]> {
    let body = res.json();

    if (body.errCode == '000000') {
      return Promise[true, "success"];
    } else {
      console.error("请求失败：" + body.errMsg);
      return null;

    }
  }

  //查询合约代码
  getinsId(instrumentId) : Promise<Instrument> {

    let request = JSON.stringify({
      instrumentId : instrumentId,
      requestId : this.request_id,
      serviceCode : 'FS127'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractFuproData)
      .catch(this.handleError);
  }

  //查询返回参数
  private extractFuproData(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      return[true,body.fieldList as Instrument] ;

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }


  }



//添加用户
  getAccount() : Promise<[boolean ,any]> {
    let request = JSON.stringify({
      requestId : this.request_id,
      serviceCode : 'FS117'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractAccount)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractAccount(res : Response) {
    let body = res.json();
    if(body.errCode == '000000') {
      return[true,body.fieldList];
    } else {
      console.error("请求失败：" + body.errMsg);
      return null;
    }
  }

//全部平仓
  getclosePosi(accountId : String) : Promise<FuordersFunc> {
    let request = JSON.stringify({
      accountId : accountId,
      requestId : this.request_id,
      serviceCode : 'FS122'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractclosePosition)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractclosePosition(res : Response) {
    let body = res.json();
    console.info(body);
    if(body.errCode == '000000') {
      return [true,"success"] ;
    } else {
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }
//快捷反手
  getQuickhand(accountId : String) : Promise<FuordersFunc> {
    let request = JSON.stringify({
      accountId : accountId,
      requestId : this.request_id,
      serviceCode : 'FS124'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractQuickhand)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractQuickhand(res : Response) {
    let body = res.json();
    console.info(body);
    if(body.errCode == '000000') {
      return [true,"success"] ;
    } else {
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }
//全部对价追单
  getallPrice(type:String) : Promise<FuordersFunc> {
    let request = JSON.stringify({
      type : type,
      requestId : this.request_id,
      serviceCode : 'FS125'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractAllprice)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractAllprice(res : Response) {
    let body = res.json();
    console.info(body);
    if(body.errCode == '000000') {
      return [true,"success"] ;
    } else {
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }
//全部对价跟单
  getallDocu(type:String) : Promise<FuordersFunc> {
    let request = JSON.stringify({
      type : type,
      requestId : this.request_id,
      serviceCode : 'FS126'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractAlldocu)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractAlldocu(res : Response) {
    let body = res.json();
    console.info(body);
    if(body.errCode == '000000') {
      return [true,"success"] ;
    } else {
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }
//全部撤单
  getallkill(type:String) : Promise<FuordersFunc> {
    let request = JSON.stringify({
      type : type,
      requestId : this.request_id,
      serviceCode : 'FS123'
    });
    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractAllkill)
      .catch(this.handleError);
  }
  //查询返回参数
  private extractAllkill(res : Response) {
    let body = res.json();
    console.info(body);
    if(body.errCode == '000000') {
      return [true,"success"] ;
    } else {
      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];
    }
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
