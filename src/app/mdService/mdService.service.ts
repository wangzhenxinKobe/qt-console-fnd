/**
 * Created by Zhou on 2017/4/14.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MdService,MdServicePage} from "./mdService";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class MdServiceService {
  private hostUrl = 'http://192.168.0.18/handler'; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private requestId = '';

  constructor(private http : Http) { }

  //柜台系统查询
  getMdServicePage(platId,currentPage) : Promise<MdServicePage> {

    let request = JSON.stringify({

      platId : platId,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.requestId,
      serviceCode : 'FS041'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractMdServicePage)
      .catch(this.handleError);

  }
  //查询返回参数
  private extractMdServicePage(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new MdServicePage();

      pagedata.mdService = body.fieldList as MdService[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }

  //增加
  addMdService(mdService : MdService) : Promise<boolean> {


    let request = JSON.stringify({

      platId : mdService.platId ,
      ip : mdService.ip,
      port : mdService.port,
      adapterType : mdService.adapterType ,
      serviceCode : 'FS042'

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
  updateMdService(mdService : MdService) : Promise<boolean> {


    let request = JSON.stringify({

      platId : mdService.platId ,
      ip : mdService.ip,
      port : mdService.port,
      adapterType : mdService.adapterType ,
      serviceCode : 'FS044'

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
  removeMdService(mdService : MdService) : Promise<boolean> {


    let request = JSON.stringify({
      serviceId : mdService.serviceId,
      serviceCode : 'FS045'

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
