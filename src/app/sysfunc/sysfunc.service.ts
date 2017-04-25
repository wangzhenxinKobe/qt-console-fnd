import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Sysfunc,SysfuncPage} from "./sysfunc";
import {ParamConfig} from "../common/param.config";

@Injectable()
export class SysfuncService {
  private hostUrl = 'http://192.168.0.18/handler'; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private requestId = '';


  constructor(private http : Http) { }

  //查询
  getSysfuncPage(funcName, currentPage) : Promise<SysfuncPage> {

    let request = JSON.stringify({

      funcName : funcName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.requestId,
      serviceCode : 'FS067'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractSysfuncPage)
      .catch(this.handleError);

  }
  //查询返回参数
  private extractSysfuncPage(res : Response){

    console.info(res);

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new SysfuncPage();

      pagedata.sysfunc = body.fieldList as Sysfunc[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }

  //增加
  addSysfunc(sysfunc : Sysfunc) : Promise<boolean> {


    let request = JSON.stringify({

      //后台生成funcId : sysfunc.funcId,
      funcId : sysfunc.funcId,
      pFuncId :sysfunc.pFuncId,
      funcName : sysfunc.funcName,
      url : sysfunc.url,
      remark : sysfunc.remark,
      level : sysfunc.level,
      status : sysfunc.status,
      serviceCode : 'FS068'
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
  updateSysfunc(sysfunc : Sysfunc) : Promise<boolean > {


    let request = JSON.stringify({


      funcId : sysfunc.funcId,
      pFuncId :sysfunc.pFuncId,
      funcName : sysfunc.funcName,
      url : sysfunc.url,
      remark : sysfunc.remark,
      level : sysfunc.level,
      status : sysfunc.status,
      serviceCode : 'FS069'

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
  removeSysfunc(sysfunc : Sysfunc) : Promise<boolean> {


    let request = JSON.stringify({
      funcId : sysfunc.funcId,
      serviceCode : 'FS070'

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

