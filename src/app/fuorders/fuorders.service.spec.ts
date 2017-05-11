/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FuordersService } from './fuorders.service';
import {Fuorders,FuordersPage} from "./fuorders";
declare var $
describe('BinfoService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [FuordersService] }); });




  it('#updateBinfo() testing', async(inject([FuordersService], (service: FuordersService) => {
    //查询测试
    //   let stockName = '股';
    //  let pageSize = '3';
    //  let currentPage = '1';
    //  let tokenId = 111;
    //  let requestId = 111;
    //  service.getFutures(stockName,pageSize,currentPage,tokenId,requestId).then((value : BinfoPage) =>{
    //
    //  expect(value).toEqual(jasmine.anything());
    //
    //
    //  if(value) {
    //
    //  $.each(value.binfo, function(i, binfo) {
    //
    //  console.info(`***********|第${i+1}条，stockErrCode[${binfo.stockCode}]`);
    //
    //  });
    //
    //  console.info(`***********|totalPages = ${value.totalPages}`);
    //  console.info(`***********|totalRows = ${value.totalRows}`);
    //  }
    //
    //
    //  });
    //添加测试
    // var fuorders = new Fuorders();
    // fuorders.accountId = 2;
    // fuorders.symbol = "2";
    // fuorders.exchange = "股票998" ;
    // fuorders.direction ="1";
    // fuorders.offset = "1";
    // fuorders.hedge = "1" ;
    // fuorders.entrustprice = "1";
    // fuorders.entrustVolume = 1;
    // fuorders.orderTradeTppe = "1";
    // fuorders.tokenid = "888";
    //
    //  service.addFuorders(fuorders).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });

    //修改测试
    // var binfo = new Binfo();
    // binfo.exchangeId = "2";
    // binfo.stockCode = "2";
    // binfo.stockName = "股票7" ;
    // binfo.stockBoard = 111;
    // binfo.flowVolume = 3333;
    // binfo.allVolume = 1111 ;
    // binfo.isFund = true;
    // binfo.isIndex = false;
    //
    // service.updateFutures(binfo).then((value : [boolean , string]) =>{
    //
    //   console.info(value);
    // });

    // //删除测试
    // var binfo = new Binfo();
    // binfo.stockCode = "2";
    //  service.removeFutures(binfo).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });
  })));
});
