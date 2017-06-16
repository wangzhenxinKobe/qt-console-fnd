import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {FuordersLeftComponent} from "./fuorders-left.component";
import {OrderInfo,FuordersFunc} from "./fuorders";
import {error} from "util";
import {generateRequestId} from "../app.module";
import { Http } from '@angular/http';
declare let SockJS;
declare let Stomp;
declare var $ : any;


@Component({
  selector: 'app-fuorders-right',
  templateUrl: './fuorders-right.component.html',
  styleUrls: ['./fuorders-right.component.css']
})
export class FuordersRightComponent implements OnInit {
  selFuordersFunc:FuordersFunc[] = [];//选择的账户
  host : string = "http://192.168.0.62:7766";
  request_id = generateRequestId();
  stompClient : any = null;
  curOrderInfo:OrderInfo[] = [];//未成交合约订单信息
  allOrder : OrderInfo[] = [];
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
  }
//委托记录按钮
  onOrder(accountId:string){

    var name = JSON.stringify({serviceCode : 'FS114', type :'E_PLAT_CJ_FUTURE_RTN_ORDER',code : '2', accountId : 101,requestId : this.request_id});
    this.stompClient.send("/app/handler",{},name );
    this.stompClient.subscribe('/topic/entrustdata',  data => {
    this.allOrder = [];
    for(let item of JSON.parse(data.body).fieldList){
        this.allOrder.push(JSON.parse(item.draftContant));
      }
    });
  }
//成交明细
onTrade(){
  var name = JSON.stringify({serviceCode : 'FS114', type :'E_PLAT_CJ_FUTURE_RTN_TRADE',code : '1', requestId : this.request_id});
  this.stompClient.send("/app/handler",{},name );
  this.stompClient.subscribe('/topic/entrustdata',  data => {
    this.allOrder = [];
    for(let item of JSON.parse(data.body).fieldList){
      this.allOrder.push(JSON.parse(item.draftContant));
    }
  });
}
//未成交合约
  onOrderr(){
    var name = JSON.stringify({serviceCode : 'FS114', type :'E_PLAT_CJ_FUTURE_RTN_ORDER',code : '0', requestId : this.request_id});
    this.stompClient.send("/app/handler",{},name );
    this.stompClient.subscribe('/topic/entrustdata',  data => {
      this.allOrder = [];
      for(let item of JSON.parse(data.body).fieldList){
        this.allOrder.push(JSON.parse(item.draftContant));
      }
    });
  }
}
