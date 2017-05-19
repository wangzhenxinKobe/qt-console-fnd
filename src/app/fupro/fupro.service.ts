import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Fupro, FuproPage} from "./fupro";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class FuproService{
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();



  constructor(private http : Http) { }

//交易平台查询
  getFuproPage(fundName,currentPage) : Promise<FuproPage> {

    let request = JSON.stringify({

      fundName : fundName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS128'

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

      var pagedata = new FuproPage();

      pagedata.fupro = body.fieldList as Fupro[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }





  //增加
  addFupro(fupro : Fupro) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      fundCode : fupro.fundCode,
      fundName : fupro.fundName,
      initialCaptital : fupro.initialCaptital,
      createDate : fupro.createDate,
      dueDate : fupro.dueDate,
      serviceCode : 'FS129'

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
  updateFupro(fupro : Fupro) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      fundCode : fupro.fundCode,
      fundName : fupro.fundName,
      initialCaptital : fupro.initialCaptital,
      createDate : fupro.createDate,
      dueDate : fupro.dueDate,
      serviceCode : 'FS131'

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
  removeFopro(fupro : Fupro) : Promise<boolean> {


    let request = JSON.stringify({
      fundCode : fupro.fundCode,
      requestId : this.request_id,
      serviceCode : 'FS132'

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
