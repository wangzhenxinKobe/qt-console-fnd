import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {TradeUnitPage, TradeUnit} from "./trade-unit";
import {generateRequestId} from "../app.module";

@Injectable()
export class TradeUnitService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) {}

  getTradeUnits(pladId, strategyName, tradeUnitName, curPage) : Promise<TradeUnitPage> {

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

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }

  }

  //增加
  addTradeUnit(tradeUnit : TradeUnit) : Promise<boolean> {


    let request = JSON.stringify({

      platId : tradeUnit.platId ,
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return null;
  }

}
