/**
 * Created by gavin on 2017/4/18.
 */

import {Component, Input, Output, OnChanges, OnInit, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-cust-selection',
    template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" >
      <option *ngFor="let obj of dataList" value="obj.value">{{obj.text}}</option>
    </select>
    
    <div *ngIf="viewType == 'readonly'">{{curData?.text}}</div>
    
    `
})

export class CustSelectionComponent implements OnChanges, OnInit {

  @Input() class : string;

  @Input() value : string;
  @Output() valueChange = new EventEmitter<string>();

  @Input() viewType : string;
  @Input() dataType : string;

  dataList : any[];
  curData : any;

  ngOnChanges(changes : SimpleChanges) {

    for(let propName in changes) {

      if(propName == 'value') {

        this.valueChange.emit(this.value);

      }

    }

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
          {value:'0', text:'类型-0'},
          {value:'1', text:'类型-1'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部策略类型'} );
        }
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
