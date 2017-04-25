import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Tplatform, TplatformPage} from "./tplatform";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class TplatformService{
  private hostUrl = 'http://192.168.0.18/handler'; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private requestId = '';

  constructor(private http : Http) { }

//交易平台查询
  getTplatformPage(deploySite,currentPage) : Promise<TplatformPage> {

    let request = JSON.stringify({

      deploySite : deploySite,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.requestId,
      serviceCode : 'FS057'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractTpatformPage)
        .catch(this.handleError);

  }

  private extractTpatformPage(res : Response) {

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new TplatformPage();

      pagedata.tplatform = body.fieldList as Tplatform[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }




  //增加
  addTplatform(tplatform : Tplatform) : Promise<boolean> {


    let request = JSON.stringify({

      platId : tplatform.platId,
      ip : tplatform.ip,
      port : tplatform.port,
      deploySite : tplatform.deploySite,
      comment : tplatform.comment,
      serviceCode : 'FS058'

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
  updateTplatform(tplatform : Tplatform) : Promise<[boolean ,string]> {


    let request = JSON.stringify({

      platId : tplatform.platId,
      ip : tplatform.ip,
      port : tplatform.port,
      deploySite : tplatform.deploySite,
      comment : tplatform.comment,
      serviceCode : 'FS060'

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
  removeTplatform(tplatform : Tplatform) : Promise<[boolean ,string]> {


    let request = JSON.stringify({
      platId : tplatform.platId,
      serviceCode : 'FS061'

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
