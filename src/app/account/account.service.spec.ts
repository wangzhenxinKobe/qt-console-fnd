/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AccountService } from './account.service';
import {Account,AccountPage} from "./account";
declare var $
describe('FuturesService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [AccountService] }); });




  it('#updateFutures() testing', async(inject([AccountService], (service: AccountService) => {
    //查询测试
     /* let accountId = 2;
     let pageSize = '3';
     let currentPage = '1';
     service.getFutures(accountId,pageSize,currentPage).then((value : AccountPage) =>{

     expect(value).toEqual(jasmine.anything());


     if(value) {

     $.each(value.account, function(i, futures) {

     console.info(`***********|第${i+1}条，platId[${futures.platId}]`);

     });

     console.info(`***********|totalPages = ${value.totalPages}`);
     console.info(`***********|totalRows = ${value.totalRows}`);
     }


     });*/
    //添加测试
   /* var account = new Account();
      account.accountId = 54,   //测试ID
      account.platId = 103,             //平台ID
      account.serviceId = 1,            //服务编号
      account.userId = '7777',
      account.fundCode = '100002',     //产品编号
      account.commAccount = '777',
      account.commPassword = '777',
      account.flowPath = '77',
      account.isauth = '77',
      account.userProductInfo = '777',
      account.inverstorId = '77',
      account.tradePassword = '777',

    service.addFutures(account).then((value : [boolean , string]) =>{

     console.info(value);
     });
*/
    //修改测试
    /*var account = new Account();
      account.accountId = 54,   //测试ID
      account.platId = 103,             //平台ID
      account.serviceId = 1,            //服务编号
      account.userId = '888',
      account.fundCode = '100002',     //产品编号
      account.commAccount = '8888',
      account.commPassword = '88',
      account.flowPath = '88',
      account.isauth = '888',
      account.userProductInfo = '888',
      account.inverstorId = '888',
      account.tradePassword = '8888',

      service.updateFutures(account).then((value : [boolean , string]) =>{

        console.info(value);
      });*/

    //删除测试
    // var account = new Account();
    // account.accountId = 54,
    //   service.removeFutures(account).then((value : [boolean , string]) =>{
    //
    //     console.info(value);
    //   });
  })));
});
