import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Fuorders} from "./fuorders";


declare var $ : any;

@Component({
  selector: 'app-fuorders-left',
  templateUrl: './fuorders-left.component.html',
  styleUrls: ['./fuorders-left.component.css']
})
export class FuordersLeftComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  curFuorders : Fuorders;
  editorTitle : string = '';
  isAddEditor : boolean;
  // futuresList : Futures[];



  constructor(
    private fuordersService : FuordersService
  ) { }

  ngOnInit() {

    this.curFuorders = {

      symbol :"",
      exchange :"SHFE",
      direction :"0",
      offset :"0",
      hedge :"1",
      entrustprice : "",
      entrustVolume : 0,
      orderTradeTppe : "0",
      rgAccountDTOlist :[]
    };

  }


  allSel(){

     $("[name = subBox1]:checkbox").attr("checked", true);

    // var clicks = $(this).data('clicks');
    //
    // if (clicks) {
    //   //Uncheck all checkboxes
    //   $(this).parents('tbody').find("tr td input").iCheck("uncheck");
    // } else {
    //   //Check all checkboxes
    //   $(this).parents('tbody').find("tr td input").iCheck("check");
    // }
    // $(this).data("clicks", clicks);
  }

  sel(){

    $('#show').html("");
    $("input[name='subBox1']:checked").each(function () {
       alert($(this).val());
      $('#show').append($(this).val());
    });
    $('#add').modal('hide');
    // $("[name = subBox]:checkbox").attr("checked", true);
  }

  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddFuorders() {

    this.isAddEditor = true;
    // this.editorTitle = '新增期货';

    this.curFuorders = { //初始化期货数据

      symbol :"",
      exchange :"",
      direction :"",
      offset :"",
      hedge :"",
      entrustprice : "",
      entrustVolume : 0,
      orderTradeTppe : "",
      rgAccountDTOlist :[]
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }





  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.fuordersService.addFuorders(this.curFuorders)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      // this.fuordersService.updateFuorders(this.curFuorders)
      //   .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    // $('#data_editor').modal('hide');

  }





  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    // this.fuordersService.getFuordersPage(this.searchPlatId, this.curPage)
    //   .then( page => this.fuordersPage = page );

  }


}
