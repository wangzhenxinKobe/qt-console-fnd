import { Component, OnInit } from '@angular/core';
import {AgroupService} from "./agroup.service";
import {AgroupPage, Agroup} from "./agroup";

declare var $ : any;

@Component({
  selector: 'app-agroup',
  templateUrl: './agroup.component.html',
  styleUrls: ['./agroup.component.css']
})
export class AgroupComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  agroupPage : AgroupPage;

  curAgroup : Agroup;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private agroupService : AgroupService
  ) { }

  ngOnInit() {

    this.curAgroup = {
  groupName :"",
  groupId : "",
  time : "",
  author : "",
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
    this.editorTitle = '新增交易分组';

    this.curAgroup = { //初始化行情数据
      groupName :"",
      groupId : "",
      time : "",
      author : "",
      comment : ""

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditAgroup(value : Agroup) {

    this.isAddEditor = false;
    this.editorTitle = '编辑交易分组';

    this.curAgroup = value;


    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteAgroup(value : Agroup) {

    this.curAgroup = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增柜台

      this.curPage = 1;
      this.agroupService.addAgroup(this.curAgroup)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.agroupService.updateAgroup(this.curAgroup)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );


    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.agroupService.removeAgroup(this.curAgroup)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.agroupService.getAgroupPage(this.searchPlatId, this.curPage)
      .then( page => this.agroupPage = page );

  }


}
