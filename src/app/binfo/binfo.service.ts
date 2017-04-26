import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Binfo, BinfoPage} from "./binfo";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class BinfoService{
  private hostUrl = 'http://192.168.0.62:8077/handler'; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private requestId = '';

  constructor(private http : Http) { }

//股票信息查询
  getBinfoPage(stockName,currentPage) : Promise<BinfoPage> {

    let request = JSON.stringify({

      stockName : stockName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId :this.requestId,
      serviceCode : 'FS006'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractBinfoData)
        .catch(this.handleError);

  }

  private extractBinfoData(res : Response){

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new BinfoPage();

      pagedata.binfo = body.fieldList as Binfo[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }


  //增加
  addBinfo(binfo : Binfo) : Promise<[boolean ]> {


    let request = JSON.stringify({

      exchangeId : binfo.exchangeId,
      stockCode : binfo.stockCode,
      stockName : binfo.stockName,
      stockBoard : binfo.stockBoard,
      flowVolume : binfo.flowVolume,
      allVolume : binfo.allVolume,
      isFund : binfo.isFund,
      isIndex : binfo.isIndex,
      serviceCode : 'FS007'

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
  updateBinfo(binfo : Binfo) : Promise<[boolean]> {


    let request = JSON.stringify({

      exchangeId : binfo.exchangeId,
      stockCode : binfo.stockCode,
      stockName : binfo.stockName,
      stockBoard : binfo.stockBoard,
      flowVolume : binfo.flowVolume,
      allVolume : binfo.allVolume,
      isFund : binfo.isFund,
      isIndex : binfo.isIndex,
      serviceCode : 'FS008'

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
  removeBinfo(binfo : Binfo) : Promise<[boolean]> {


    let request = JSON.stringify({
      stockCode : binfo.stockCode,
      serviceCode : 'FS009'

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