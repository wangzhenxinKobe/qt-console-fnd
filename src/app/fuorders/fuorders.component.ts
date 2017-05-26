import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Fuorders,Instrument,FuordersAccount} from "./fuorders";
import {forEach} from "@angular/router/src/utils/collection";
import {findIndex} from "rxjs/operator/findIndex";
declare var $ : any;
@Component({
  selector: 'app-fuorders',
  templateUrl: './fuorders.component.html',
  styleUrls: ['./fuorders.component.css']
})
export class FuordersComponent implements OnInit {
  instrumentName : string = '';
  instrumentId : string = '';
  curInstrument : Instrument[] = []; //被选中的合约列表
  allInstrument : Instrument[] = []; //所有的合约列表
  curFuorders : Fuorders;//
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
      instrumentId : "",
      rgAccountDTOlist :[],
    };
  }
//查询合约
  searchi(){
    this.fuordersService.getinsId(this.instrumentName,this.instrumentId)
      .then(result => {
        if(result[0]){

          this.allInstrument = result[1];
        }else {
          alert(result[1]);
        }
      }).catch(error => alert(error));
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
  this.fuordersService.addFuorders(this.curFuorders,this.instrumentId)
  .then(result => {
    if (result[0]){
    }
    }
  ).catch(error => alert(error));
  }

  onFuoItemClick(fuo : Instrument) {
    fuo.active = !fuo.active;
    console.info(fuo.active);
  }
//选择合约
  addFuo() {
    for(let fuo of this.allInstrument.filter(ele => ele.active == true)) {
      if(this.curInstrument.findIndex(at => at.instrumentId == fuo.instrumentId) == -1) {
        this.curInstrument.push(JSON.parse(JSON.stringify(fuo)));
        fuo.active = false;
      }
    }
  }
  //删除选中的合约
  deleteFuo() {
    while(true) {
      let index = this.curInstrument.findIndex(at => at.active == true);
      if( index != -1) {
        this.curInstrument.splice(index, 1);
      } else {
        break;
      }
    }
  }
  //点击合约保存按钮实时刷新行情
  save(){
    setInterval( () => {
      for(let item of this.curInstrument){
        this.fuordersService.getMark(item.instrumentId)
          .then(result => {
             if(result[0]){
               console.info(result[1]);
               item.dPreSettlementPrice = result[1].dPreSettlementPrice;
               item.nUpdateTime = result[1].nUpdateTime;
               item.dAskPrice = result[1].dAskPrice;
               item.dHighestPrice = result[1].dHighestPrice;
               item.dBidPrice = result[1].dBidPrice;
               item.dLastPrice = result[1].dLastPrice;
               item.dLowestPrice = result[1].dLowestPrice;
               item.nBidVolume = result[1].nBidVolume;
               item.dLowerLimitPrice = result[1].dLowerLimitPrice;
               item.nAskVolume = result[1].nAskVolume;
               item.dUpperLimitPrice = result[1].dUpperLimitPrice;
               item.dAskPrice = result[1].dAskPrice;
             }
          }
      ).catch(error => alert(error))
      }
    },500);
  $("#selectins").modal("hide");
  }
  //选中的Tr
  curTr(item){
    this.instrumentId = item.instrumentId;
  }
  //选择li
  selectli(item){
    this.instrumentId = item.instrumentId;
  }
}




