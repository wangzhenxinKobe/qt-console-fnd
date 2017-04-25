import { Component, OnInit } from '@angular/core';
import {FuturesService} from "./futures.service";
import {FuturesPage,Futures} from "./futures";

declare var $ : any;

@Component({
  selector: 'app-futures',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  futuresPage : FuturesPage;

  curFutures : Futures;
  editorTitle : string = '';
  isAddEditor : boolean;
  // futuresList : Futures[];


  constructor(
    private futuresService : FuturesService
  ) { }

  ngOnInit() {

    this.curFutures = {
      exchangeId :"",
      productId :"",
      productName :"",
      volumeMultiple : 0,
      priceTick : 0,
      feeMode : 0,
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

  onAddFutures() {

    this.isAddEditor = true;
    this.editorTitle = '新增期货';

    this.curFutures = { //初始化期货数据
      exchangeId :"",
      productId :"",
      productName :"",
      volumeMultiple : 0,
      priceTick : 0,
      feeMode : 0,
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditFutures(value : Futures) {

    this.isAddEditor = false;
    this.editorTitle = '编辑期货';

    this.curFutures = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteFutures(value : Futures) {

    this.curFutures = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.futuresService.addFutures(this.curFutures)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      this.futuresService.updateFutures(this.curFutures)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.futuresService.removeFutures(this.curFutures)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.futuresService.getFuturesPage(this.searchPlatId, this.curPage)
      .then( page => this.futuresPage = page );

  }


}
