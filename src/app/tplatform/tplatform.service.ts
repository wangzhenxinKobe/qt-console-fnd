import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Tplatform, TplatformPage} from "./tplatform";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class TplatformService{
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  private allTransPlatform = null;

  constructor(private http : Http) { }

//交易平台查询
  getTplatformPage(deploySite,currentPage) : Promise<TplatformPage> {

    let request = JSON.stringify({

      deploySite : deploySite,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS057'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractTpatformPage)
        .catch(this.handleError);

  }

  private extractTpatformPage(res : Response) {

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


  getAllTransPlatform() : Promise<Tplatform[]> {

    if(!!this.allTransPlatform) return Promise.resolve(this.allTransPlatform);

    let request = JSON.stringify({

      deploySite : '',
      pageSize : 1000,
      currentPage : 1,
      requestId : this.request_id,
      serviceCode : 'FS057'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( (res : Response) => {

        let body = res.json();

        if(body.errCode == '000000') {

          this.allTransPlatform = body.fieldList as Tplatform[];

          return this.allTransPlatform;

        } else {

          console.error("请求失败：" + body.errMsg);
          return null;

        }

      })
      .catch(this.handleError);

  }


  //增加
  addTplatform(tplatform : Tplatform) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
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
      requestId : this.request_id,
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
      requestId : this.request_id,
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
