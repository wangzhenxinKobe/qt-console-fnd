import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Futures,FuturesPage} from "./futures";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class FuturesService {
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

  //查询
  getFuturesPage(productName,currentPage) : Promise<FuturesPage> {

    let request = JSON.stringify({

      productName : productName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS024'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractFuturesData)
        .catch(this.handleError);

  }
  //查询返回参数
  private extractFuturesData(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new FuturesPage();

      pagedata.futures = body.fieldList as Futures[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }

  //增加
  addFutures(futures : Futures) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      exchangeId : futures.exchangeId,
      productId : futures.productId,
      productName : futures.productName,
      volumeMultiple : futures.volumeMultiple,
      priceTick : futures.priceTick,
      feeMode : futures.feeMode,

      serviceCode : 'FS025'

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
  updateFutures(futures : Futures) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      exchangeId : futures.exchangeId,
      productId : futures.productId,
      productName : futures.productName,
      volumeMultiple : futures.volumeMultiple,
      priceTick : futures.priceTick,
      feeMode : futures.feeMode,
      serviceCode : 'FS026'

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



//删除
  removeFutures(futures : Futures) : Promise<boolean> {


    let request = JSON.stringify({
      productId : futures.productId,
      requestId : this.request_id,
      serviceCode : 'FS027'

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
