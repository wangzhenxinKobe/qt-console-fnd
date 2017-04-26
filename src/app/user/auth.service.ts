import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Authority} from "./user";

@Injectable()
export class AuthService {

  private loginStatusSource = new Subject<boolean>();

  loginStatus$ = this.loginStatusSource.asObservable();

  private isLogedIn : boolean = false;
  private tokenId : string;

  authorities : Authority[] = null;
  /*
  authorities = [

    {id: 1400, icon: 'fa fa-dashboard', name: '业务信息管理',
      children: [
        {id: 1401, url: '/buz/strategy', name: '策略维护', active: ''},
        {id: 1403, url: '#', name: '股票基本信息维护', active: ''},
        {id: 1404, url: '#', name: '股票指数管理', active: ''},
        {id: 1405, url: '#', name: '股票篮子管理', active: ''},
        {id: 1406, url: '/buz/futures', name: '期货品种管理', active: ''},
        {id: 1407, url: '/buz/market-data', name: '行情订阅信息维护', active: ''},
        {id: 1408, url: '#', name: '行情源配置', active: ''},
        {id: 1409, url: '#', name: '柜台系统配置', active: ''},
        {id: 1410, url: '#', name: '交易账户维护', active: ''}
      ]
    },
    {id: 1300, icon: 'fa fa-rmb', name: '交易管理',
      children: [
        {id: 1301, url: '/buz/trade-unit', name: '交易单元创建维护', active: ''},
        {id: 1303, url: '#', name: '期货交易', active: ''},
        {id: 1304, url: '#', name: '股票交易', active: ''},
      ]
    },
    {id: 1200, icon: 'glyphicon glyphicon-screenshot', name: '运行监控',
      children: [
        {id: 1201, url: '#', name: '进度监控', active: ''},
        {id: 1202, url: '#', name: '仓位监控', active: ''}
      ]
    },
    {id: 1500, icon: 'fa  fa-gear', name: '系统管理',
      children: [
        {id: 1501, url: '#', name: '交易平台管理', active: ''},
        {id: 1502, url: '#', name: '交易时间限制', active: ''},
        {id: 1504, url: '#', name: '功能权限配置', active: ''},
        {id: 1505, url: '#', name: '角色配置', active: ''},
        {id: 1506, url: '#', name: '操作员配置', active: ''}
      ]
    }

  ];
  */


  sendLoginStatus(status : boolean) {

    this.isLogedIn = status;
    this.loginStatusSource.next(status);

  }

  getLoginStatus() {
    return this.isLogedIn;
  }

  setTokenId(tokenId : string) {
    this.tokenId = tokenId;
  }

  getTokenId() {
    return this.tokenId;
  }

}