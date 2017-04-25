import { Component, OnInit } from '@angular/core';
import {TplatformService} from "./tplatform.service";
import {TplatformPage, Tplatform} from "./tplatform";

declare var $ : any;

@Component({
  selector: 'app-tplatform',
  templateUrl: './tplatform.component.html',
  styleUrls: ['./tplatform.component.css']
})
export class TplatformComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  tplatformPage : TplatformPage;

  curTplatform : Tplatform;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private tplatformService : TplatformService
  ) { }

  ngOnInit() {

    this.curTplatform = {
    platId : 0,
    ip : "",
    port : 0,
    deploySite : "",
    comment : ""



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
    this.editorTitle = '新增柜台系统';

    this.curTplatform = { //初始化行情数据
      platId : 0,
      ip : "",
      port : 0,
      deploySite : "",
      comment : ""

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditTplatform(value : Tplatform) {

    this.isAddEditor = false;
    this.editorTitle = '编辑柜台系统';

    this.curTplatform = value;


    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteTplatform(value : Tplatform) {

    this.curTplatform = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增柜台

      this.curPage = 1;
      this.tplatformService.addTplatform(this.curTplatform)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.tplatformService.updateTplatform(this.curTplatform)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );


    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.tplatformService.removeTplatform(this.curTplatform)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.tplatformService.getTplatformPage(this.searchPlatId, this.curPage)
      .then( page => this.tplatformPage = page );

  }


}
