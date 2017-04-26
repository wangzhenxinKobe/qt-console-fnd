import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ParamConfig} from "../common/param.config";
import {generateRequestId} from "../app.module";
import {RolePage, Role, RoleFunc, SysParentFunc} from "./role";

@Injectable()
export class OproleService {

  private hostUrl = ParamConfig.HTTP_HOST_URL; //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private request_id = generateRequestId();

  constructor(private http:Http) {
  }

  getRoles(roleName, curPage) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      roleName : roleName,
      pageSize : ParamConfig.DATA_LIST_PAGE_SIZE,
      currentPage : curPage,
      requestId : this.request_id,
      serviceCode : 'FS071'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractRoleList)
      .catch(this.handleError);

  }

  private extractRoleList(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {

      var pagedata = new RolePage();

      pagedata.roles = body.fieldList as Role[];
      pagedata.totalPages = body.totalPages;
      pagedata.totalRows = body.totalRows;

      return [true, pagedata];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }

  }

  getRole(roleId) : Promise<[boolean, any]> {

    let request = JSON.stringify({

      roleId : roleId,
      requestId : this.request_id,
      serviceCode : 'FS073'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then(this.extractRoleData)
      .catch(this.handleError);


  }

  private extractRoleData(res : Response) {

    let body = res.json();

    if(body.errCode == '000000') {


      return [true, body as Role];

    } else {

      console.error("请求失败：" + body.errMsg);
      return [false, body.errMsg];

    }

  }

  /**
   * 获取全部系统功能
   * @returns
     */
  getAllSysFuncs() : Promise<[boolean, any]> {

    let request = JSON.stringify({
      funcName : '',
      pageSize : 1000,
      currentPage : 1,
      requestId : this.request_id,
      serviceCode : 'FS067'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {

          //组织权限清单
          let funcList = [];

          for(let parent of body.fieldList.filter(item => {return item.level == '0';})) {

            let func = new SysParentFunc();

            func.funcId = parent.funcId;
            func.funcName = parent.funcName;
            func.children = body.fieldList.filter(item => {return item.pFuncId == parent.funcId;}) as RoleFunc[];

            funcList.push(func);

          }

          console.info(funcList);

          return [ true, funcList ] ;


        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);


  }

  addRole(role : Role) : Promise<[boolean, any]> {

    let request = JSON.stringify({
      roleName : role.roleName,
      roleDescr : role.roleDescr,
      roleFuncList : JSON.stringify(role.fieldList),
      requestId : this.request_id,
      serviceCode : 'FS072'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);
  }

  editRole(role : Role) : Promise<[boolean, any]>  {

    let funcList = [];
    for(let func of role.fieldList) {

      funcList.push({
        roleId : role.roleId,
        funcId : func.funcId
      });

    }

    let request = JSON.stringify({
      roleId : role.roleId,
      roleName : role.roleName,
      roleDescr : role.roleDescr,
      roleFuncList : JSON.stringify(funcList),
      requestId : this.request_id,
      serviceCode : 'FS074'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);
  }

//删除
  removeRole(role : Role) : Promise<[boolean, any]> {


    let request = JSON.stringify({
      roleId : role.roleId,
      requestId : this.request_id,
      serviceCode : 'FS075'

    });

    return this.http
      .post(this.hostUrl, request, {headers: this.headers})
      .toPromise()
      .then( res => {

        let body = res.json();
        if(body.errCode == '000000') {
          return [true, 'success'] ;
        }
        else {
          console.error("请求失败：" + body.errMsg);
          return [false, body.errMsg];
        }

      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<[boolean, string]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject([false, error.toString()]) ;
  }

}
