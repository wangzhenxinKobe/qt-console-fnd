import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Strategy, StrategyPage} from "./strategy";
import {ParamConfig} from "../common/param.config";


@Injectable()
export class StrategyService {

  private hostUrl = 'http://192.168.0.36:8081/handler'; //URL to web api
//  private hostUrl = 'app/strategies'; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = '';

  constructor(private http : Http) {}

  getStrategies(plat_id, strategy_type, strategy_name, current_page) : Promise<StrategyPage> {

    let request = JSON.stringify({

      platId : plat_id,
      strategyType : strategy_type,
      strategyName : strategy_name,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : current_page,
      requestId : this.request_id,
      serviceCode : 'FS001'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractStragiesData)
      .catch(this.handleError);

  }

  private extractStragiesData(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new StrategyPage();

      pagedata.strategies = body.fieldList as Strategy[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }

  }

  /**
   * 获取策略参数列表
   * @param strategy
     */
  getStrategyParam(strategy : Strategy) : Promise<any> {

    return this.http.get(this.hostUrl+`?strategyName=${strategy.strategyName}`)
      .toPromise()
      .then( (response : Response) => {
        let body = response.json().data as Strategy[];
        return body[0].paraList;
      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return null;
  }


}
