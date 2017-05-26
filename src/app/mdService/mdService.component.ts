import { Component, OnInit } from '@angular/core';
import {MdServiceService} from "./mdService.service";
import {MdServicePage, MdService} from "./mdService";
import {BaseComponent} from "../common/base.component";
declare var $ : any;

@Component({
  selector: 'app-mdService',
  templateUrl: './mdService.component.html',
  styleUrls: ['./mdService.component.css']
})
export class MdServiceComponent extends BaseComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  mdServicePage : MdServicePage;

  curMdService : MdService;
  // editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private mdServiceService : MdServiceService
  ) { super();}

  ngOnInit() {

    this.curMdService = {
    platId : 0,
    ip : "",
    port : 0,
    adapterType : 0,
      serviceId : 0,
      serviceType : 0
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

  onAddMdService() {
    this.isAddEditor = true;
    // this.editorTitle = '新增柜台系统';
    this.curMdService = { //初始化行情数据
      platId : 0,
      ip : "",
      port : 0,
      adapterType : 0,
      serviceType : 0,
      serviceId : 0
    };
    $('#data_editor').modal('show'); //显示编辑对话框
  }

  onEditMdService(value : MdService) {

    this.isAddEditor = false;
    // this.editorTitle = '编辑柜台系统';

    this.curMdService = value;


    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteMdService(value : MdService) {

    this.curMdService = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增柜台

      this.curPage = 1;
      this.mdServiceService.addMdService(this.curMdService)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.mdServiceService.updateMdService(this.curMdService)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );


    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.mdServiceService.removeMdService(this.curMdService)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');
this.alert.info("删除成功！")
  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.mdServiceService.getMdServicePage(this.searchPlatId, this.curPage)
      .then( page => this.mdServicePage = page );

  }


}
