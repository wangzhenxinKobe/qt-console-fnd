/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SindexService } from './sindex.service';
import {Sindex,SindexPage} from "./sindex";
declare var $
describe('SindexService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [SindexService] }); });




  it('#updateSindex() testing', async(inject([SindexService], (service: SindexService) => {
    //查询测试
    //   let indexName = '4';
    //  let pageSize = '3';
    //  let currentPage = '1';
    //  service.getFutures(indexName,pageSize,currentPage).then((value : Sindexpage) =>{
    //
    //  expect(value).toEqual(jasmine.anything());
    //
    //
    //  if(value) {
    //
    //  $.each(value.sindex, function(i, sindex) {
    //
    //  console.info(`***********|第${i+1}条，stockCode[${sindex.stockCode}]stockName[${sindex.stockName}]exchangeId[${sindex.exchangeId}]`);
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
    //    var sindex = new Sindex();
    // sindex.exchangeId = "2";
    // sindex.stockCode = "1";
    // sindex.stockName = "股票4" ;
    // sindex.stockBoard = 111;
    // sindex.flowVolume = 3;
    // sindex.allVolume = 1111 ;
    // sindex.isFund = "1";
    // sindex.isIndex = "1";
    //
    // service.addFutures(sindex).then((value : [boolean , string]) =>{
    //
    //   console.info(value);
    // });

    //修改测试
    // var sindex = new Sindex();
    // sindex.exchangeId = "2";
    // sindex.stockCode = "1";
    // sindex.stockName = "股票6";
    // sindex.stockBoard = 111222;
    // sindex.flowVolume = 363;
    // sindex.allVolume = 1111;
    //   sindex.isFund = true;
    // sindex.isIndex = false;
    //
    // service.updateFutures(sindex).then((value : [boolean , string]) =>{
    //
    //   console.info(value);
    // });

    // //删除测试
    // var sindex = new Sindex();
    // sindex.indexName = "416";
    //  service.removeFutures(sindex).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });
  })));
});
