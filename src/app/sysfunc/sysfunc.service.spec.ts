/**
 * Created by Zhou on 2017/4/14.
 */
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SysfuncService } from './sysfunc.service';
import {Sysfunc,SysfuncPage} from "./sysfunc";
declare var $
describe('FuturesService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [SysfuncService] }); });




  it('#updateFutures() testing', async(inject([SysfuncService], (service: SysfuncService) => {
    //查询测试
    // let funcName = 2;
    //  let pageSize = '3';
    //  let currentPage = '1';
    //  service.getFutures(funcName,pageSize,currentPage).then((value : SysfuncPage) =>{
    //
    //  expect(value).toEqual(jasmine.anything());
    //
    //
    //  if(value) {
    //
    //  $.each(value.sysfunc, function(i, futures) {
    //
    //  console.info(`***********|第${i+1}条，platId[${futures.funcName}]`);
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
    /*var sysfunc = new Sysfunc();
    sysfunc.pFuncId = "1",
    sysfunc.funcName = "权限名称",
    sysfunc.url = "D/user",
    sysfunc.remark = "备注",
    sysfunc.level = "1234",
    sysfunc.status = "1",
    service.addFutures(sysfunc).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //修改测试
    /*var sysfunc = new Sysfunc();
     sysfunc.funcId = '',
     sysfunc.pFuncId = "1",
     sysfunc.funcName = "权限名称",
     sysfunc.url = "D/user",
     sysfunc.remark = "备注",
     sysfunc.level = "1234",
     sysfunc.status = "1",
     service.updateFutures(sysfunc).then((value : [boolean , string]) =>{

     console.info(value);
     });*/

    //删除测试
    /*var sysfunc = new Sysfunc();
     sysfunc.funcId = '',
     service.removeFutures(sysfunc).then((value : [boolean , string]) =>{

     console.info(value);
     });*/
  })));
});
