/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MarketDataService } from './market-data.service';
import {MarketData,MarketDataPage} from "./market-data";

declare var $

describe('MarketDataService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [MarketDataService] }); });




  it('#updateFutures() testing', async(inject([MarketDataService], (service: MarketDataService) => {
    /*//查询测试
     let platId = '102';
     let pageSize = '3';
     let currentPage = '1';
     service.getFutures(platId,pageSize,currentPage).then((value : MarketDataPage) =>{

     expect(value).toEqual(jasmine.anything());


     if(value) {

     $.each(value.marketData, function(i, futures) {

     console.info(`***********|第${i+1}条，platId[${futures.platId}]`);

     });

     console.info(`***********|totalPages = ${value.totalPages}`);
     console.info(`***********|totalRows = ${value.totalRows}`);
     }


     });*/
   /* //添加测试
    var futures = new MarketData();
     futures.platId = 103;
     futures.symbolId = "ceshi";
     futures.symbolType =  1;

     service.addFuters(futures).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //修改测试
    /*var futures = new MarketData();
    futures.platId = 102;
    futures.symbolId = "ceshi";
    futures.symbolType =  1;

    service.updateFutures(futures).then((value : [boolean , string]) =>{

      console.info(value);
    });*/

   /* //删除测试
    var futures = new MarketData();
    futures.symbolId = "ca";
    service.removeFutures(futures).then((value : [boolean , string]) =>{

      console.info(value);
    });*/
  })));
});
