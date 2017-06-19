import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";

import {Fuorders,Instrument,FuordersAccount,Positioninfo,FuordersFunc} from "./fuorders";
import { Headers, Http, Response } from '@angular/http';
import {generateRequestId} from "../app.module";
import 'rxjs/add/operator/toPromise';
import {forEach} from "@angular/router/src/utils/collection";
import {findIndex} from "rxjs/operator/findIndex";

declare let SockJS;
declare let Stomp;
declare var $ : any;

@Component({
  selector: 'app-fuorders',
  templateUrl: './fuorders.component.html',
  styleUrls: ['./fuorders.component.css']
})
export class FuordersComponent implements OnInit {
  host : string = "http://192.168.0.62:7766";
  stompClient : any = null;
  request_id = generateRequestId();
  messages : string[] = [];
  instrumentName : string = '';
  accountId : string = '';
  instrumentId : string = '';
  allPosition : Positioninfo[] = [];
  curFuordersFunc:FuordersFunc[] = [];//所有账户
  selFuordersFunc:FuordersFunc[] = [];//选择的账户
  curInstrument : Instrument[] = []; //被选中的合约列表
  selInstrument : Instrument[] = []; //被选择保存的合约列表
  allInstrument : Instrument[] = []; //所有的合约列表
  curFuorders : Fuorders;//
  fuorderAccountList : FuordersAccount[] = [];
  editorTitle : string = '';
  isAddEditor : boolean;
  constructor(
    private fuordersService : FuordersService,
    private http: Http
  ) { }
  ngOnInit() {
    //建立连接
      var socket = new SockJS(this.host + '/gs-guide-websocket');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({
      }, (frame) => {
        console.log('Connected: ' + frame);
      });
    $('#selyh').modal('show');
    this.fuordersService.getAccount()
      .then(result => {
        if(result[0]){
          this.curFuordersFunc = result[1];
        }else {
          alert(result[1]);
        }
      }).catch(error => alert(error));
    this.curFuorders = {
      symbol :"",
      exchange :"SHFE",
      direction :"0",
      offset :"0",
      hedge :"1",
      entrustPrice : "",
      entrustVolume : 0,
      orderTradeType : "0",
      instrumentId : "",
      tradeUnitId : "",
      rgAccountDTOlist :[],
    };
  }

//查询合约
  searchi(){
this.instrumentId = "";
    this.fuordersService.getinsId(this.instrumentId)
      .then(result => {
        if(result[0]){
          this.allInstrument = result[1];
        }else {
          alert(result[1]);
        }
      }).catch(error => alert(error));
  }
//搜索合约代码下拉li
  searchii(){
    this.fuordersService.getinsId(this.instrumentId)
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
      item.rgAccountDTOlist.forEach(func =>{ func.active = item.active;
          console.info(func.active)
      }
      );
    }
 //点击账户checkbox
  lonesel(rga){
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
        selectID += idwrap.accountId+' ';
    }
    return selectID;
  }
//手动下单
  onAddFuorders() {
  this.fuordersService.addFuorders(this.curFuorders,this.instrumentId)
  .then(result => {
    if (result[0]){
      console.info(result[1]);
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
      }else{
        break;
      }
    }
  }

  //点击合约保存按钮实时刷新行情
  save(){
    this.selInstrument = this.curInstrument.concat();
    let fuoList = [];
    for(let fuo of this.selInstrument){
      fuoList.push(fuo);
    };
    var name = JSON.stringify({serviceCode : 'FS133', instrumentIdList : JSON.stringify(fuoList), requestId : this.request_id});
    this.stompClient.send("/app/handler",{},name );
    this.stompClient.subscribe('/topic/quotedata',  data => {
      JSON.parse(data.body).fieldList.forEach(item => {
        let instrument = this.selInstrument.find(ins => ins.instrumentId == item.szSymbol);
        if(instrument){
          instrument.dPreSettlementPrice = item.dPreSettlementPrice;
          instrument.nUpdateTime = item.nUpdateTime;
          instrument.dAskPrice = item.dAskPrice;
          instrument.dHighestPrice = item.dHighestPrice;
          instrument.dBidPrice = item.dBidPrice;
          instrument.dLastPrice = item.dLastPrice;
          instrument.dLowestPrice = item.dLowestPrice;
          instrument.nBidVolume = item.nBidVolume;
          instrument.dLowerLimitPrice = item.dLowerLimitPrice;
          instrument.nAskVolume = item.nAskVolume;
          instrument.dUpperLimitPrice = item.dUpperLimitPrice;
          instrument.dAskPrice = item.dAskPrice;

        }

      });

    });

  $("#selectins").modal("hide");
  }

  //选中的Tr
  curTr(item : Instrument){
    this.instrumentId = item.instrumentId;
  }
  //选择li
  selectli(item){
    this.instrumentId = item.instrumentId;
  }

  //全部平仓按钮
  allclosePosi(accountId : String){
    this.fuordersService.getclosePosi(accountId)
      .then(result =>{
        if(result[0]){

        }else {
          alert(result[1]);
        }
      }
      ).catch(error => alert(error));
  }
//快捷反手
  quickhand(accountId : String){
    this.fuordersService.getQuickhand(accountId)
      .then(result =>{
          if(result[0]){

          }else {
            alert(result[1]);
          }
        }
      ).catch(error => alert(error));
  }
//全部对价追单
  allprice(type:String){
this.fuordersService.getallPrice(type)
  .then(result =>{
      if(result[0]){

      }else {
        alert(result[1]);
      }
    }
  ).catch(error => alert(error));
  }

  //全部对价跟单
  alldocu(type:String){
    this.fuordersService.getallDocu(type)
      .then(result =>{
          if(result[0]){

          }else {
            alert(result[1]);
          }
        }
      ).catch(error => alert(error));
  }
//全部撤单
  allkill(type:String){
    this.fuordersService.getallkill(type)
      .then(result =>{
          if(result[0]){

          }else {
            alert(result[1]);
          }
        }
      ).catch(error => alert(error));
  }


  //选择持仓用户
  selyh(){
    if(this.curFuordersFunc.length == 0){
      this.fuordersService.getAccount()
        .then(result => {
          if(result[0]){
            this.curFuordersFunc = result[1];
          }else {
            alert(result[1]);
          }
        }).catch(error => alert(error));
    }
  }
  //点击选择持仓用户
  selPosi(rga){
    rga.active = !rga.active;
    console.info(rga.active);
  }
  //全部选择持仓用户
  allPosi(){
    for(let rga of this.curFuordersFunc){
      rga.active = !rga.active;
    }
  }
//保存已选择的用户
  savePosi(){
    this.selFuordersFunc = [];
    for(let rga of this.curFuordersFunc.filter(ele => ele.active == true)){
      this.selFuordersFunc.push(rga);
    }
    $('#selyh').modal('hide'); //隐藏编辑对话框
  }
  //点击取消已选择账户
  delPosi(){
    for(let rga of this.curFuordersFunc.filter(ele => ele.active == true)){
      rga.active = false;
    }
  }
  searchinfo(accountId : string){
     this.accountId = accountId;

   }
}




