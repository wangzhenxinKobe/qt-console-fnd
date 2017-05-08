import { Component, OnInit } from '@angular/core';
import {TdServiceService} from "./tdService.service";
import {TdServicePage, TdService} from "./tdService";

declare var $ : any;

@Component({
  selector: 'app-tdService',
  templateUrl: './tdService.component.html',
  styleUrls: ['./tdService.component.css']
})
export class TdServiceComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  tdServicePage : TdServicePage;

  curTdService : TdService;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private tdServiceService : TdServiceService
  ) { }

  ngOnInit() {

    this.curTdService = {
    platId : 0,
    ip : "",
    port : 0,
    adapterType : 0,
    userId : "",
    tradePassword : "",
      serviceType:0,
      serviceId : 0,
      accountId : 0,
    };

  }

  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddTdService() {

    this.isAddEditor = true;
    this.editorTitle = '新增行情源配置';

    this.curTdService = { //初始化行情数据
      platId : 0,
      ip : "",
      port : 0,
      adapterType : 1,
      userId : "",
      tradePassword : "",
      serviceType:1,
      serviceId : 0,
      accountId : 0,

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditTdService(value : TdService) {

    this.isAddEditor = false;
    this.editorTitle = '编辑行情源配置';
    this.curTdService = value;
    $('#data_editor').modal('show'); //显示编辑对话框
  }

  onDeleteTdService(value : TdService) {

    this.curTdService = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增行情数据

      this.curPage = 1;
      this.tdServiceService.addTdService(this.curTdService)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.tdServiceService.updateTdService(this.curTdService)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.tdServiceService.removeTdService(this.curTdService)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.tdServiceService.getTdServicePage(this.searchPlatId, this.curPage)
      .then( page => this.tdServicePage = page );

  }


}
