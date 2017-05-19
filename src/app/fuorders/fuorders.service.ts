import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {Fuorders, Instrument, FuordersAccount} from "./fuorders";
import {generateRequestId} from "../app.module";
import Any = jasmine.Any;

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
  addFuorders(fuorders : Fuorders) : Promise<[boolean ,any]> {

    // let acctList = [];
    // for(let acct of fuorders.rgAccountDTOlist) {
    //
    //   acctList.push({
    //     accountId : acct.accountId
    //   });
    //
    // }
    let request = JSON.stringify({

      // rgAccountDTOlist : JSON.stringify(acctList),
      //accountId : fuorders.accountId,
      symbol : fuorders.symbol,
      exchage : fuorders.exchange,
      direction : fuorders.direction,
      offset : fuorders.offset,
      hedge : fuorders.hedge,
      entrustprice : fuorders.entrustprice,
      entrustVolume : fuorders.entrustVolume,
      orderTradeTppe : fuorders.orderTradeTppe,
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

    console.info(res);

    let body = res.json();

    if (body.errCode == '000000') {

      console.info("请求成功");

      return Promise[true, "success"];

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }
  }

  //查询合约代码
  getinsId(instrumentName,instrumentId) : Promise<[boolean ,Any]> {

    let request = JSON.stringify({
      instrumentName : instrumentName,
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

      return[true,body.fieldList] ;

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];;

    }


  }



//
//
//   //修改
//   updateFutures(futures : Futures) : Promise<[boolean ,string]> {
//
//
//     let request = JSON.stringify({
//
//       exchangeId : futures.exchangeId,
//       productId : futures.productId,
//       productName : futures.productName,
//       volumeMultiple : futures.volumeMultiple,
//       priceTick : futures.priceTick,
//       feeMode : futures.feeMode,
//       serviceCode : 'FS026'
//
//     });
//
//     return this.http
//       .post(this.hostUrl, request, {headers: this.headers})
//       .toPromise()
//       .then(this.addFuturesData)
//       .catch(this.handleError);
//
//   }
//   //修改返回结果
//   private updateFuturesData	(res : Response) : Promise<[boolean ,string]> {
//
//     console.info(res);
//
//     let body = res.json();
//
//     if (body.errCode == '000000') {
//
//       console.info("请求成功");
//
//       return Promise[true, ""];
//
//     } else {
//
//       console.error("请求失败：" + body.errMsg);
//       return null;
//
//     }
//   }
//
// //删除
//   removeFutures(futures : Futures) : Promise<[boolean ,string]> {
//
//
//     let request = JSON.stringify({
//       productId : futures.productId,
//       serviceCode : 'FS027'
//
//     });
//
//     return this.http
//       .post(this.hostUrl, request, {headers: this.headers})
//       .toPromise()
//       .then(this.addFuturesData)
//       .catch(this.handleError);
//
//   }
//   //删除返回结果
//   private removeFuturesData	(res : Response) : Promise<[boolean ,string]> {
//
//     console.info(res);
//
//     let body = res.json();
//
//     if (body.errCode == '000000') {
//
//       console.info("请求成功");
//
//       return Promise[true, ""];
//
//     } else {
//
//       console.error("请求失败：" + body.errMsg);
//       return null;
//
//     }
//   }







  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
