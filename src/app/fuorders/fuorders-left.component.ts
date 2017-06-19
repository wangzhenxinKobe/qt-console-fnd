import { Component, OnInit, OnChanges,Input,SimpleChanges } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Positioninfo,FuordersFunc} from "./fuorders";
import {generateRequestId} from "../app.module";
import { Headers, Http, Response } from '@angular/http';

declare let SockJS;
declare let Stomp;
declare var $ : any;

@Component({
  selector: 'app-fuorders-left',
  templateUrl: './fuorders-left.component.html',
  styleUrls: ['./fuorders-left.component.css']
})
export class FuordersLeftComponent implements OnInit,OnChanges {
  host : string = "http://192.168.0.62:7766";
  stompClient : any = null;
  @Input() accountId : string = "";
  bConnected : boolean = true;
  request_id = generateRequestId();
  allPosition : Positioninfo[] = [];
  curFuordersFunc:FuordersFunc[] = [];//所有账户
  selFuordersFunc:FuordersFunc[] = [];//选择的账户
  constructor(
    private http: Http,
    private fuordersService : FuordersService
  ){ }
  ngOnInit() {
    //建立连接
    var socket = new SockJS(this.host + '/gs-guide-websocket');
     this.stompClient = Stomp.over(socket);
     this.stompClient.connect({
     }, (frame) => {
     this.bConnected = true;
     console.log('Connected: ' + frame);
     });
  }


ngOnChanges(changes : SimpleChanges){
   for(let propName in changes){
     if(propName = 'accountId'){
      if(this.bConnected && this.accountId != null && this.accountId != ""){
       var name = JSON.stringify({serviceCode : 'FS120',accountId : this.accountId, requestId : this.request_id});
        this.stompClient.send("/app/handler",{},name );
        this.stompClient.subscribe('/topic/posdata', data =>{
          var infoPosi = JSON.parse(JSON.parse(data.body).resultMap);
          this.allPosition = [];
          for(let key in infoPosi){
            this.allPosition.push(JSON.parse(infoPosi[key]));
          }
        });
        }
      }
    }
  }

}
