/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { TdServiceService } from './tdService.service';
import {TdService,TdServicePage} from "./tdService";
declare var $
describe('TdServiceService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [TdServiceService] }); });




  it('#updateFutures() testing', async(inject([TdServiceService], (service: TdServiceService) => {
    //查询测试
    /* let platId = '102';
     let pageSize = '3';
     let currentPage = '1';
     service.getTdServicePage(platId,pageSize,currentPage).then((value : TdServicePage) =>{

     expect(value).toEqual(jasmine.anything());


     if(value) {

     $.each(value.tdService, function(i, futures) {

     console.info(`***********|第${i+1}条，platId[${futures.platId}]`);

     });

     console.info(`***********|totalPages = ${value.totalPages}`);
     console.info(`***********|totalRows = ${value.totalRows}`);
     }


     });*/
     //添加测试
    /* var tdService = new TdService();
      tdService.platId = 101;
      tdService.serviceId = 110;  //测试字段
      tdService.ip = "188.88.8",
      tdService.port = 222,
      tdService.adapterType = 0,
      tdService.serviceType = 3,
      tdService.accountId = 1,
      tdService.userId = "2",
      tdService.tradePassword = "1234",

     service.addFuters(tdService).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //修改测试
    /*var tdService = new TdService();
     tdService.serviceId = 7;
     tdService.platId = 103;
     tdService.ip = "188888",
     tdService.port = 222,
     tdService.adapterType = 1,
     tdService.serviceType = 7,
     tdService.accountId = 7,
     tdService.userId = "2",
     tdService.tradePassword = "1234",

     service.updateFutures(tdService).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //删除测试
    /*var tdService = new TdService();
     tdService.serviceId = 0;
     service.removeFutures(tdService).then((value : [boolean , string]) =>{

     console.info(value);
    });*/
  })));
});
