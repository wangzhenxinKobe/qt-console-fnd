/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SbasketService } from './sbasket.service';
import {Sbasket,SbasketPage} from "./sbasket";
declare var $
describe('SbasketService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [SbasketService] }); });




  it('#updateSbasket() testing', async(inject([SbasketService], (service: SbasketService) => {
    //查询测试
    //   let basketName = "篮";
    //  let pageSize = '3';
    //  let currentPage = '1';
    //  service.getFutures(basketName,pageSize,currentPage).then((value : SbasketPage) =>{
    //
    //  expect(value).toEqual(jasmine.anything());
    //
    //
    //  if(value) {
    //
    //  $.each(value.sbasket, function(i, sbasket) {
    //
    //  console.info(`***********|第${i+1}条，stockCode[${sbasket.stockCode}]basketName[${sbasket.basketName}]`);
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
    // var sbasket = new Sbasket();
    // sbasket.stockCode = "2";
    // sbasket.basketName = "篮子名称6";
    // sbasket.weight = "" ;
    // sbasket.volume = 111;
    // sbasket.errCode1 = "3";
    // sbasket.volume1 = 333 ;
    //
    //  service.addFutures(sbasket).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });

    //修改测试
    // var sbasket = new Sbasket();
    // sbasket.stockCode = "3333";
    // sbasket.basketName = "篮子名称1";
    // sbasket.weight = "2.2" ;
    // sbasket.volume = 22;
    // sbasket.errCode1 = "22";
    // sbasket.volume1 = 33355 ;
    //
    // service.updateFutures(sbasket).then((value : [boolean , string]) =>{
    //
    //   console.info(value);
    // });

    // //删除测试
    // var sbasket = new Sbasket();
    // sbasket.basketName = "篮子名称2";
    //  service.removeFutures(sbasket).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });
  })));
});
