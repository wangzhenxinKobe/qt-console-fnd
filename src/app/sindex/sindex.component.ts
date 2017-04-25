import { Component, OnInit } from '@angular/core';
import {SindexService} from "./sindex.service";
import {SindexPage,Sindex} from "./sindex";

declare var $ : any;

@Component({
  selector: 'app-sindex',
  templateUrl: './sindex.component.html',
  styleUrls: ['./sindex.component.css']
})
export class SindexComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  sindexPage : SindexPage;

  curSindex : Sindex;
  editorTitle : string = '';
  isAddEditor : boolean;



  constructor(
    private sindexService : SindexService
  ) { }

  ngOnInit() {

    this.curSindex = {
      indexName :"",
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : ""

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

  // onAddSindex() {
  //
  //   this.isAddEditor = true;
  //   this.editorTitle = '新增期货';
  //
  //   this.curSindex = { //初始化期货数据
  //     indexName :"",
  //     stockCode :"",
  //     stockName :"",
  //     exchangeId :"",
  //     flowVolume : 0,
  //     allVolume : 0,
  //     stockBoard : 0,
  //     isFund : "",
  //     isIndex : ""
  //   };
  //
  //   $('#data_editor').modal('show'); //显示编辑对话框
  //
  // }

  onEditSindex(value : Sindex) {

    this.isAddEditor = false;
    this.editorTitle = '编辑股票指数';

    this.curSindex = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteSindex(value : Sindex) {

    this.curSindex = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.sindexService.addSindex(this.curSindex)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据
      this.sindexService.updateSindex(this.curSindex)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');


  }

  delete() {

    this.sindexService.removeSindex(this.curSindex)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.sindexService.getSindexPage(this.searchPlatId, this.curPage)
      .then( page => this.sindexPage = page );
    $('body').on('hidden', '.modal', function () {
      $(this).removeData('modal');
    });

  }


}
