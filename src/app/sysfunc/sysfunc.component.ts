import { Component, OnInit } from '@angular/core';
import {SysfuncService} from "./sysfunc.service";
import {SysfuncPage, Sysfunc} from "./sysfunc";
import {BaseComponent} from "../common/base.component";
declare var $ : any;

@Component({
  selector: 'app-sysfunc',
  templateUrl: './sysfunc.component.html',
  styleUrls: ['./sysfunc.component.css']
})
export class SysfuncComponent extends BaseComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  sysfuncPage : SysfuncPage;

  curSysfunc : Sysfunc;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private sysfuncService : SysfuncService
  ) {super(); }

  ngOnInit() {

    this.curSysfunc = {
 funcId : "",
 pFuncId : "",
 funcName :"",
 url : "",
 remark  : "",
 level : "1",
 status :"1"
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

  onAddSysfunc() {

    this.isAddEditor = true;
    this.editorTitle = '新增功能权限';

    this.curSysfunc = { //初始功能权限
      funcId : "",
      pFuncId : "",
      funcName :"",
      url : "",
      remark  : "",
      level : "1",
      status :"1"

    };
    $("#fc").attr("disabled",true);
    $('#data_editor').modal('show'); //显示编辑对话框

  }

  demo1(){

    if($("#yesno option:selected").text() == "一级菜单"){
      $("#fc").attr("disabled",true);
    }
    if($("#yesno option:selected").text() == "二级菜单"){
      $("#fc").attr("disabled",false);
    }
  }



  onEditSysfunc(value : Sysfunc) {

    this.isAddEditor = false;
    this.editorTitle = '编辑功能权限';

    this.curSysfunc = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteSysfunc(value : Sysfunc) {

    this.curSysfunc = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增功能权限

      this.curPage = 1;
      this.sysfuncService.addSysfunc(this.curSysfunc)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.sysfuncService.updateSysfunc(this.curSysfunc)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.sysfuncService.removeSysfunc(this.curSysfunc)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');
    this.alert.info("删除成功！");
  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.sysfuncService.getSysfuncPage(this.searchPlatId, this.curPage)
      .then( page => this.sysfuncPage = page );

  }


}
