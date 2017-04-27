/**
 * Created by gavin on 2017/4/18.
 */

import {Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-cust-select',
    template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option *ngFor="let obj of dataList" value="{{obj.value}}">{{obj.text}}</option>
    </select>
    
    <div *ngIf="viewType == 'readonly'">{{curData?.text}}</div>
    
    `
})

export class CustSelectComponent implements OnInit {

  @Input() value : string;
  @Output() valueChange = new EventEmitter<string>();

  @Output() change = new EventEmitter();

  @Input() viewType : string;
  @Input() dataType : string;

  dataList : any[];
  curData : any;

  onChange() {

    this.valueChange.emit(this.value);
    this.change.emit();

  }

  ngOnInit() {

    switch (this.dataType) { //准备数据

      case 'market_data':
        this.dataList = [
          {value:'0', text:'股票'},
          {value:'1', text:'期货'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部行情类型'} );
        }
        break;

      case 'strategy_type':
        this.dataList = [
          {value:'0', text:'插件'},
          {value:'1', text:'脚本'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部策略类型'} );
        }
        break;

      case 'trade_unit_status':
        this.dataList = [
          {value:'1', text:'已创建'},
          {value:'2', text:'已启动'},
          {value:'3', text:'已停止'},
          {value:'4', text:'已删除'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部交易单元状态'} );
        }
        break;

      case 'strategy_param_type':
        this.dataList = [
          {value:'0', text:'bool'},
          {value:'1', text:'int'},
          {value:'2', text:'float'},
          {value:'3', text:'string'},
          {value:'4', text:'json'}
        ];
        break;

      default:
        this.dataList = null;
        return;

    }

    if(this.viewType == 'readonly') {

      this.curData = this.dataList.find(data => data.value == this.value);

    }
  }


}
