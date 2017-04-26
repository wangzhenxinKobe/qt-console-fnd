import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Sindex, SindexPage} from "./sindex";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class SindexService{
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

//股票信息查询
  getSindexPage(indexName,currentPage) : Promise<SindexPage> {

    let request = JSON.stringify({

      indexName : indexName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS012'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractSindexData)
        .catch(this.handleError);

  }

  private extractSindexData(res : Response){

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new SindexPage();

      pagedata.sindex = body.fieldList as Sindex[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }


  //增加
  addSindex(sindex : Sindex) : Promise<[boolean]> {


    let request = JSON.stringify({
      requestId : this.request_id,
      exchangeId : sindex.exchangeId,
      stockCode : sindex.stockCode,
      stockName : sindex.stockName,
      stockBoard : sindex.stockBoard,
      flowVolume : sindex.flowVolume,
      allVolume : sindex.allVolume,
      isFund : sindex.isFund,
      isIndex : sindex.isIndex,
      serviceCode : 'FS013'

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


 // 修改
  updateSindex(sindex : Sindex) : Promise<[boolean]> {


    let request = JSON.stringify({
      requestId : this.request_id,
      exchangeId : sindex.exchangeId,
      stockCode : sindex.stockCode,
      stockName : sindex.stockName,
      stockBoard : sindex.stockBoard,
      flowVolume : sindex.flowVolume,
      allVolume : sindex.allVolume,
      isFund : sindex.isFund,
      isIndex : sindex.isIndex,
      serviceCode : 'FS014'

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
  removeSindex(sindex : Sindex) : Promise<[boolean]> {


    let request = JSON.stringify({
      indexName : sindex.indexName,
      requestId : this.request_id,
      serviceCode : 'FS015'

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
