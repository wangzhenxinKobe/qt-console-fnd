import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {Fuorders,Positioninfo} from "./fuorders";

declare var $ : any;

@Component({
  selector: 'app-fuorders-left',
  templateUrl: './fuorders-left.component.html',
  styleUrls: ['./fuorders-left.component.css']
})
export class FuordersLeftComponent implements OnInit {

allPosition : Positioninfo[] = [];



  editorTitle : string = '';
  isAddEditor : boolean;



  constructor(
    private fuordersService : FuordersService
  ) { }

  ngOnInit() {

  }


//查询用户持仓信息
  searchinfo(){
    setTimeout( () => {
this.fuordersService.getPosi(this.allPosition)
  .then()
    },500)
  }








}
