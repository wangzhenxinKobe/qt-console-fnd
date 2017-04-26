import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Strategy, StrategyPage} from "./strategy";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";


@Injectable()
export class StrategyService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = '';

  constructor(private http : Http) {

    this.request_id = generateRequestId();

  }

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
   * 根据策略名称获取策略信息
   * @param name
     */
  getStrategyByName(name : string) : Promise<Strategy> {

    let request = JSON.stringify({

      strategyName : name,
      requestId : this.request_id,
      serviceCode : 'FS003'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

        if(body.errCode == '000000') {

          return body as Strategy;

        } else {

          console.error("请求失败：" + body.errMsg);
          return null;

        }

      })
      .catch(this.handleError);

  }

  /**
   * 用于策略新增时，导入策略参数列表
   * @param strategy
     */
  loadStrategyParam(name : string) : Promise<any> {

    let request = JSON.stringify({

      strategyName : name,
      requestId : this.request_id,
      serviceCode : 'FS001'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

      })
      .catch(this.handleError);

  }

  updateStrategyParam(strategyName : string, paraName : string, paraValue : string) {

    let request = JSON.stringify({

      strategyName : strategyName,
      paraName : paraName,
      paraValue : paraValue,
      requestId : this.request_id,
      serviceCode : 'FS004'

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