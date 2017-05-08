/**
 * Created by Zhou on 2017/4/14.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {TdService,TdServicePage} from "./tdService";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class TdServiceService {
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  private allTdService = null;

  constructor(private http : Http) { }

  //行情源查询
  getTdServicePage(platId,currentPage) : Promise<TdServicePage> {

    let request = JSON.stringify({

      platId : platId,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS036'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractTdServicePage)
      .catch(this.handleError);

  }
  //查询返回参数
  private extractTdServicePage(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new TdServicePage();

      pagedata.tdService = body.fieldList as TdService[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }


  getAllTdService() : Promise<TdService[]> {

    if(!!this.allTdService) return Promise.resolve(this.allTdService);

    let request = JSON.stringify({

      accountId : "",
      userId : "",
      pageSize : 1000,
      currentPage : 1,
      requestId : this.request_id,
      serviceCode : 'FS117'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( (res : Response) => {

        let body = res.json();

        if(body.errCode == '000000') {

          this.allTdService = body.fieldList as TdService[];

          return this.allTdService;

        } else {

          console.error("请求失败：" + body.errMsg);
          return null;

        }

      })
      .catch(this.handleError);

  }




  //增加
  addTdService(tdService : TdService) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      platId : tdService.platId ,
      ip : tdService.ip,
      port : tdService.port,
      adapterType : tdService.adapterType ,


      serviceType : tdService.serviceType,


      serviceCode : 'FS037'

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
  updateTdService(tdService : TdService) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      platId : tdService.platId ,
      ip : tdService.ip,

      port : tdService.port,
      adapterType : tdService.adapterType ,
      userId : tdService.userId,
      tradePassword : tdService.tradePassword,
      serviceType : tdService.serviceType,
      serviceId : tdService.serviceId,
      accountId : tdService.accountId,
      serviceCode : 'FS039'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {
console.info(res);
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
  removeTdService(tdService : TdService) : Promise<boolean> {


    let request = JSON.stringify({
      serviceId : tdService.serviceId,
      requestId : this.request_id,
      serviceCode : 'FS040'

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
