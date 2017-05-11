import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {Fuorders,FuordersPage} from "./fuorders";
import {generateRequestId} from "../app.module";

@Injectable()
export class FuordersService {
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

  //下单
  // getFuorders(accountId,symbol,exchage,direction,offset,hedge,entrustprice,entrustVolume,orderTradeTppe,pageSize, currentPage) : Promise<FuordersPage> {
  //
  //   let request = JSON.stringify({
  //
  //     accountId : accountId,
  //     symbol : symbol,
  //     exchage : exchage,
  //     direction : direction,
  //     offset : offset,
  //     hedge : hedge,
  //     entrustprice : entrustprice,
  //     entrustVolume : entrustVolume,
  //     orderTradeTppe : orderTradeTppe,
  //     pageSize : pageSize,
  //     currentPage : currentPage,
  //     requestId : this.requestId,
  //     serviceCode : 'FS056'
  //
  //   });
  //
  //   return this.http
  //     .post(this.hostUrl, request, {headers: this.headers})
  //     .toPromise()
  //     .then(this.extractFuordersData)
  //     .catch(this.handleError);
  //
  // }
  // //查询返回参数
  // private extractFuordersData(res : Response) : Promise<FuordersPage> {
  //
  //   console.info(res);
  //
  //   let body = res.json();
  //
  //   if(body.errCode == '000000') {
  //
  //     var pagedata = new FuordersPage();
  //
  //     pagedata.fuorders = body.fieldList as Fuorders[];
  //     pagedata.totalPages = body.totalPages;
  //     pagedata.totalRows = body.totalRows;
  //
  //     return pagedata;
  //
  //   } else {
  //
  //     console.error("请求失败：" + body.errMsg);
  //     return null;
  //
  //   }
  //
  //
  // }

//   //增加
  addFuorders(fuorders : Fuorders) : Promise<[boolean ,string]> {


    let request = JSON.stringify({

      exchangeId : fuorders.accountId,
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
  private addFuordersData	(res : Response) : Promise<[boolean ,string]> {

    console.info(res);

    let body = res.json();

    if (body.errCode == '000000') {

      console.info("请求成功");

      return Promise[true, ""];

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

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
