import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Fuorders,Instrument,FuordersAccount} from "./fuorders";
import {forEach} from "@angular/router/src/utils/collection";


declare var $ : any;

@Component({
  selector: 'app-fuorders',
  templateUrl: './fuorders.component.html',
  styleUrls: ['./fuorders.component.css']
})
export class FuordersComponent implements OnInit {
  instrumentName : string = '';
  instrumentId : string = '';
  curInstrument : Instrument;
  curFuorders : Fuorders;
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
//查询合约
  searchi(){

    this.fuordersService.getinsId(this.instrumentName,this.instrumentId)
      .then(result => {
alert(111111111)
        if(result[0]){

        }
      })
  }
  //点击选择合约标签
  addsymbol(){

     $('#search').modal('show'); //显示编辑对话框
  }

  //选择交易账户
   addgroup() {
     if (this.fuorderAccountList.length == 0) {
       this.fuordersService.getFuorders()
         .then(result => {
           if (result[0]) {
             this.fuorderAccountList = result[1];
           } else {
             alert(result[1]);
           }
         }).catch(error => alert(error));
     }
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
    this.curFuorders.rgAccountDTOlist = [];
    for(let item of this.fuorderAccountList){
      for(let idwrap of item.rgAccountDTOlist.filter(ele => ele.active == true)){
        this.curFuorders.rgAccountDTOlist.push(idwrap);
        console.info(this.curFuorders.rgAccountDTOlist)
      }
    }
    $('#add').modal('hide'); //隐藏编辑对话框
  }
//选择账户value值
  selectedAccounts(){
    var selectID =  "";
    for(let idwrap of this.curFuorders.rgAccountDTOlist){
        selectID += idwrap.accountId+' '
    }
    return selectID;
  }

//手动下单
  onAddFuorders() {
  this.fuordersService.addFuorders(this.curFuorders)
  .then(result => {

    if (result[0]){


    }
    }

  ).catch(error => alert(error));
  }
}
