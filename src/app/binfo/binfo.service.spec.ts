/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BinfoService } from './binfo.service';
import {Binfo,BinfoPage} from "./binfo";
declare var $
describe('BinfoService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [BinfoService] }); });




  it('#updateBinfo() testing', async(inject([BinfoService], (service: BinfoService) => {
    //查询测试
    //   let stockName = '股';
    //  let pageSize = '3';
    //  let currentPage = '1';
    //  service.getFutures(stockName,pageSize,currentPage).then((value : BinfoPage) =>{
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
    // var binfo = new Binfo();
    // binfo.exchangeId = "2";
    // binfo.stockCode = "2";
    // binfo.stockName = "股票7" ;
    // binfo.stockBoard = 111;
    // binfo.flowVolume = 3;
    // binfo.allVolume = 1111 ;
    // binfo.isFund = true;
    // binfo.isIndex = false;
    //
    //  service.addFutures(binfo).then((value : [boolean , string]) =>{
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
