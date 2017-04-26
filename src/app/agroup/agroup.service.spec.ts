/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AgroupService } from './agroup.service';
import {Agroup, AgroupPage} from "./agroup";
declare var $
describe('TplatformService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports:[HttpModule], providers: [AgroupService] }); });




  it('#updateTplatform() testing', async(inject([AgroupService], (service: AgroupService) => {
    //部署地点查询测试
    //   let deploySite = "本地";
    //  let pageSize = "1";
    //  let currentPage = "1";
    //  service.getFutures(deploySite,pageSize,currentPage).then((value : TplatformPage) =>{
    //
    //  expect(value).toEqual(jasmine.anything());
    //
    //
    //  if(value) {
    //
    //  $.each(value.tplatform, function(i, tplatform) {
    //
    //  console.info(`***********|第${i+1}条，platId[${tplatform.platId}]ip[${tplatform.ip}]port[${tplatform.port}]deploySite[${tplatform.deploySite}]` +
    //  `comment[${tplatform.comment}]`);
    //
    //  });
    //
    //  console.info(`***********|totalPages = ${value.totalPages}`);
    //  console.info(`***********|totalRows = ${value.totalRows}`);
    //  }





    //  });
    //添加测试
    // var tplatform = new Tplatform();
    // tplatform.platId = 104;
    // tplatform.ip = "127.0.0.6";
    // tplatform.port = 8888 ;
    // tplatform.deploySite = "银行";
    // tplatform.comment = "备注";
    //
    //
    //  service.addFutures(tplatform).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });

    //修改测试

    // var tplatform = new Tplatform();
    // tplatform.platId = 104;
    // tplatform.ip = "127.0.0.8";
    // tplatform.port = 7777 ;
    // tplatform.deploySite = "银行";
    // tplatform.comment = "备注";
    //
    // service.updateFutures(tplatform).then((value : [boolean , string]) =>{
    //
    //   console.info(value);
    // });

    // //删除测试
    // var tplatform = new Tplatform();
    // tplatform.platId = 103;
    //  service.removeFutures(tplatform).then((value : [boolean , string]) =>{
    //
    //  console.info(value);
    //  });
  })));
});
