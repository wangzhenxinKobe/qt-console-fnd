import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Fuorders,FuordersFunc,FuordersAccount} from "./fuorders";
import {forEach} from "@angular/router/src/utils/collection";


declare var $ : any;

@Component({
  selector: 'app-fuorders',
  templateUrl: './fuorders.component.html',
  styleUrls: ['./fuorders.component.css']
})
export class FuordersComponent implements OnInit {
  curFuorders : Fuorders;
  rgAccountDTOlist:FuordersFunc[];

  fuorderAccountList : FuordersAccount[] = [];
  editorTitle : string = '';
  isAddEditor : boolean;

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

  //选择交易账户
   addgroup(){
    this.fuordersService.getFuorders()
      .then(result => {
        if(result[0]){
          this.fuorderAccountList = result[1];
        }else {
          alert(result[1]);
        }
      } ).catch(error => alert(error));
     $('#add').modal('show'); //显示编辑对话框
   }
//全选checkbox
    allSel(item : FuordersAccount){
      item.active = !item.active;
      item.rgAccountDTOlist.forEach(func =>{ func.active = item.active});
      console.info(item.active)
    }
 //点击账户checkbox
  lonesel(rga ){
    rga.active = !rga.active;
    console.info(rga.active)
  }
//点击保存按钮
  sel(){
    $('#add').modal('hide'); //隐藏编辑对话框
  }
//选择账户value值
  selectedAccounts(){
    var selectID =  "";
    for(let item of this.fuorderAccountList){
      for(let idwrap of item.rgAccountDTOlist.filter(ele => ele.active == true)){
        selectID += idwrap.accountId+' '
      }
    }
    return selectID;
  }
//点击取消
  qingkong(){
    $("#show").val("");
  }
//手动下单
  onAddFuorders() {
  this.fuordersService.getFuorders()
  .then()
  }
}
