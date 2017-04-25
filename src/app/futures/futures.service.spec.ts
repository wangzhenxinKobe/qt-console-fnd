/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FuturesService } from './futures.service';
import {Futures,FuturesPage} from "./futures";
declare var $
describe('FuturesService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
      imports:[HttpModule], providers: [FuturesService] }); });




  it('#updateFutures() testing', async(inject([FuturesService], (service: FuturesService) => {
   //查询测试
  /*  let productName = '品';
    let pageSize = '3';
    let currentPage = '1';
    service.getFuturesPage(productName,pageSize,currentPage).then((value : FuturesPage) =>{

      expect(value).toEqual(jasmine.anything());


      if(value) {

        $.each(value.futures, function(i, futures) {

          console.info(`***********|第${i+1}条，exchangeId[${futures.exchangeId}]productId[${futures.productId}]productName[${futures.productName}]volumeMultiple[${futures.volumeMultiple}]` +
              `priceTick[${futures.priceTick}]feeMode[${futures.feeMode}]comment[${futures.comment}]`);

        });

        console.info(`***********|totalPages = ${value.totalPages}`);
        console.info(`***********|totalRows = ${value.totalRows}`);
      }


    });*/
    //添加测试
    /*var futures = new Futures();
     futures.exchangeId = 2;
     futures.productId = 1;
     futures.productName = "品种3" ;
     futures.volumeMultiple = 3;
     futures.priceTick = "22.22" ;
     futures.feeMode = "2222";

     service.addFutures(futures).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //修改测试
    /*var futures = new Futures();
     futures.exchangeId = 2;
     futures.productId = 1;
     futures.productName = "品种1111" ;
     futures.volumeMultiple = 3;
     futures.priceTick = "11.2" ;
     futures.feeMode = "2222";

     service.updateFutures(futures).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //删除测试
    /*var futures = new Futures();
     futures.productId = 1;
     service.removeFutures(futures).then((value : [boolean , string]) =>{

     console.info(value);
     });*/
  })));
});
