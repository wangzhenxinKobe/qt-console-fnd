import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MarketData,MarketDataPage} from "./market-data";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class MarketDataService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = ParamConfig.HTTP_REQUEST_ID;

  constructor(private http : Http) { }

  //查询
  getMarketDataPage(platId, currentPage) : Promise<MarketDataPage> {

    let request = JSON.stringify({

      platId : platId,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS030'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractMarketDataPage)
      .catch(this.handleError);

  }
  //查询返回参数
  private extractMarketDataPage(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new MarketDataPage();

      pagedata.marketData = body.fieldList as MarketData[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }

  //增加
  addMarketData(marketData : MarketData) : Promise<boolean> {


    let request = JSON.stringify({

      platId : marketData.platId ,
      symbolId : marketData.symbolId,
      symbolType : marketData.symbolType,
      serviceCode : 'FS031'

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
  updateMarketData(marketData : MarketData) : Promise<boolean> {


    let request = JSON.stringify({

        platId : marketData.platId ,
        symbolId : marketData.symbolId,
        symbolType : marketData.symbolType,
        serviceCode : 'FS032'

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
  removeMarketData(marketData : MarketData) : Promise<boolean> {


    let request = JSON.stringify({
      symbolId : marketData.symbolId,
      serviceCode : 'FS033'

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
    return null;
  }


}
