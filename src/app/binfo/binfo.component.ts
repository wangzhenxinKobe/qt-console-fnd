import { Component, OnInit } from '@angular/core';
import {BinfoService} from "./binfo.service";
import {BinfoPage,Binfo} from "./binfo";

declare var $ : any;

@Component({
  selector: 'app-binfo',
  templateUrl: './binfo.component.html',
  styleUrls: ['./binfo.component.css']
})
export class BinfoComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;


  binfoPage : BinfoPage;

  curBinfo : Binfo;
  editorTitle : string = '';
  isAddEditor : boolean;



  constructor(
    private binfoService : BinfoService
  ) { }

  ngOnInit() {

    this.curBinfo = {
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : "",


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

  onAddBinfo() {

    this.isAddEditor = true;
    this.editorTitle = '新增股票基本信息';

    this.curBinfo = { //初始化期货数据
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : "",

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditBinfo(value : Binfo) {

    this.isAddEditor = false;
    this.editorTitle = '编辑股票基本信息';

    this.curBinfo = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteBinfo(value : Binfo) {

    this.curBinfo = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.binfoService.addBinfo(this.curBinfo)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      this.binfoService.updateBinfo(this.curBinfo)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.binfoService.removeBinfo(this.curBinfo)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.binfoService.getBinfoPage(this.searchPlatId, this.curPage)
      .then( page => this.binfoPage = page );

  }


}
