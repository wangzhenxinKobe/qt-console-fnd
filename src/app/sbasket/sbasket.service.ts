import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Sbasket, SbasketPage} from "./sbasket";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";

@Injectable()
export class SbasketService{
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

//股票信息查询
  getSbasketPage(basketName,currentPage) : Promise<SbasketPage> {

    let request = JSON.stringify({

      basketName : basketName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS018'

    });

    return this.http
        .post(this.hostUrl, request, {headers: this.headers})
        .toPromise()
        .then(this.extractSbasketData)
        .catch(this.handleError);

  }

  private extractSbasketData(res : Response){

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new SbasketPage();

      pagedata.sbasket = body.fieldList as Sbasket[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }


  //增加
  addSbasket(sbasket : Sbasket) : Promise<boolean> {


    let request = JSON.stringify({

      requestId : this.request_id,
      stockCode : sbasket.stockCode,
      basketName : sbasket.basketName,
      weight : sbasket.weight,
      volume : sbasket.volume,
      errCode1 : sbasket.errCode1,
      volume1 : sbasket.volume1,

      serviceCode : 'FS019'

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
  updateSbasket(sbasket : Sbasket) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      stockCode : sbasket.stockCode,
      basketName : sbasket.basketName,
      weight : sbasket.weight,
      volume : sbasket.volume,
      errCode1 : sbasket.errCode1,
      volume1 : sbasket.volume1,
      serviceCode : 'FS020'
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
  removeSbasket(sbasket : Sbasket) : Promise<boolean> {


    let request = JSON.stringify({
      basketName : sbasket.basketName,
      requestId : this.request_id,
      serviceCode : 'FS021'

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
    return Promise.reject(error.message || error);
  }
}
