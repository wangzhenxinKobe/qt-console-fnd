import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Strategy, StrategyPage, StrategyParam} from "./strategy";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";


@Injectable()
export class StrategyService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = '';

  private allStrategies : Strategy[];

  constructor(private http : Http) {

    this.request_id = generateRequestId();

  }

  getStrategies(plat_id, strategy_type, strategy_name, current_page) : Promise<[boolean, any]> {

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

      return [true, pagedata];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false , body.errMsg];

    }

  }

  /**
   * 获取全部策略
   * @returns {any}
     */
  getAllStrategies() : Promise<[ boolean, any ]> {

    if(!!this.allStrategies) return Promise.resolve(this.allStrategies);

    let request = JSON.stringify({

      platId : '',
      strategyType : '',
      strategyName : '',
      pageSize : 2000,
      currentPage : 1,
      requestId : this.request_id,
      serviceCode : 'FS001'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( (res : Response) => {

        let body = res.json();

        if(body.errCode == '000000') {

          this.allStrategies = body.fieldList as Strategy[];

          return [true, this.allStrategies];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, null];

        }

      }).catch(this.handleError);

  }

  /**
   * 根据策略名称获取策略信息
   * @param name
     */
  getStrategyByName(name : string) : Promise<[boolean, any]> {

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

          return [true, body as Strategy];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      }).catch(this.handleError);

  }

  syncStrategyParam(name : string) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      name : name,
      requestId : this.request_id,
      serviceCode : 'FS084'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          return [true, "success"];

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

  }

  /**
   * 用于策略新增时，导入策略参数列表
   * @param name
     */
  loadStrategyParam(name : string) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      strategyName : name,
      requestId : this.request_id,
      serviceCode : 'FS115'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

        if(body.errCode == '000000') {

          return [ true, body.fieldList as StrategyParam[] ]

        } else {

          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];

        }

      })
      .catch(this.handleError);

  }

  addStrategy(strategy : Strategy) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      strategyName : strategy.strategyName,
      platId : strategy.platId,
      winFile : strategy.winFile,
      strategyVer : strategy.strategyVer,
      strategyType : strategy.strategyType,
      author : strategy.author,
      comment : strategy.comment,
      paraList : JSON.stringify(strategy.fieldList),
      requestId : this.request_id,
      serviceCode : 'FS002'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();

        if(body.errCode == '000000') {
          return [true, "success"] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  updateStrategyParam(strategyName : string, paraName : string, paraValue : string) : Promise<[boolean, any]> {

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
          return [true, "success"] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.toString());
  }


}
