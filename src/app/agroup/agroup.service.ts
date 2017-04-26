import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Agroup, AgroupPage} from "./agroup";
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
@Injectable()
export class AgroupService{
  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http : Http) { }

//交易平台查询
  getAgroupPage(groupName,currentPage) : Promise<AgroupPage> {

    let request = JSON.stringify({

      groupName : groupName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : currentPage,
      requestId : this.request_id,
      serviceCode : 'FS104'

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

      var pagedata = new AgroupPage();

      pagedata.agroup = body.fieldList as Agroup[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return pagedata;

    } else {

      console.error("请求失败：" + body.errMsg);
      return null;

    }


  }




  //增加
  addAgroup(agroup : Agroup) : Promise<boolean> {


    let request = JSON.stringify({
      requestId : this.request_id,
      groupName : agroup.groupName,
      comment : agroup.comment,
      serviceCode : 'FS105'
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
  updateAgroup(agroup : Agroup) : Promise<boolean> {


    let request = JSON.stringify({
      groupId : agroup.groupId,
      requestId : this.request_id,
      groupName : agroup.groupName,
      comment : agroup.comment,
      serviceCode : 'FS106'

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
  removeAgroup(agroup : Agroup) : Promise<boolean> {


    let request = JSON.stringify({
      groupId : agroup.groupId,
      requestId : this.request_id,
      serviceCode : 'FS107'

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
