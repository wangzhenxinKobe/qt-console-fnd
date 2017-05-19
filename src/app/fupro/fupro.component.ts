import { Component, OnInit } from '@angular/core';
import {FuproService} from "./fupro.service";
import {FuproPage, Fupro} from "./fupro";
import {BaseComponent} from "../common/base.component";
declare var $ : any;

@Component({
  selector: 'app-fupro',
  templateUrl: './fupro.component.html',
  styleUrls: ['./fupro.component.css']
})
export class FuproComponent extends BaseComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  fuproPage : FuproPage;

  curFupro : Fupro;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private fuproService : FuproService
  ) {super(); }

  ngOnInit() {

    this.curFupro = {
      fundCode : "",
      fundName : "",
      initialCaptital : 0,
      createDate : 0,
      dueDate : 0



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
    this.editorTitle = '新增基金产品';

    this.curFupro = { //初始化
      fundCode : "",
      fundName : "",
      initialCaptital : 0,
      createDate : 0,
      dueDate : 0

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditFupro(value : Fupro) {

    this.isAddEditor = false;
    this.editorTitle = '编辑基金产品';

    this.curFupro = value;


    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteFupro(value : Fupro) {

    this.curFupro = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增柜台

      this.curPage = 1;
      this.fuproService.addFupro(this.curFupro)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.fuproService.updateFupro(this.curFupro)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );


    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.fuproService.removeFopro(this.curFupro)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');
    this.alert.info("删除成功！");
  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.fuproService.getFuproPage(this.searchPlatId, this.curPage)
      .then( page => this.fuproPage = page );

  }


}
