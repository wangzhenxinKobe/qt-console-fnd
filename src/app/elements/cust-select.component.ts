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

  @Input() viewType : string;
  @Input() dataType : string;

  dataList : any[];
  curData : any;

  onChange() {

    this.valueChange.emit(this.value);

  }

  ngOnInit() {

    switch (this.dataType) { //准备数据

      case 'tradehouse':
        this.dataList = [
          {value:'0', text:'上期所'},
          {value:'1', text:'郑商所'},
          {value:'2', text:'大商所'},
          {value:'3', text:'中金所'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部交易所'} );
        }

        break;

      case 'tradehouse':
        this.dataList = [
          {value:'SHFE', text:'上期所'},
          {value:'CZCE', text:'郑商所'},
          {value:'DCE', text:'大商所'},
          {value:'CFFEX', text:'中金所'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部交易所'} );
        }

        break;


      case 'bankuai':
        this.dataList = [
          {value:'0', text:'主板'},
          {value:'1', text:'中小板'},
          {value:'2', text:'创业板'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部股票板块'} );
        }

        break;

      case 'shangji':
        this.dataList = [
          {value:'0', text:'无'},
          {value:'1200', text:'业务信息管理'},
          {value:'1300', text:'交易管理'},
          {value:'1500', text:'系统管理'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }

        break;


      case 'binfo':
        this.dataList = [
          {value:'0', text:'否'},
          {value:'1', text:'是'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部股票信息'} );
        }
        break;

      case 'jiaoyisuo':
        this.dataList = [
          {value:'SH', text:'上海证券交易所'},
          {value:'SZ', text:'深圳证券交易所'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'sfunc':
        this.dataList = [
          {value:'0', text:'一级菜单'},
          {value:'1', text:'二级菜单'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'sindex':
        this.dataList = [
          {value:'0', text:'否'},
          {value:'1', text:'是'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部股票指数'} );
        }
        break;



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



      case 'tdService':
        this.dataList = [
          {value:'0', text:'期货行情'},
          {value:'1', text:'股票行情'},
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'tdSer1':
        this.dataList = [
          {value:'0', text:'CTP'},
          {value:'1', text:'飞马'},
          {value:'2', text:'金飞鼠'},
          {value:'3', text:'UFT'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;


      case 'tdSer2':
        this.dataList = [
          {value:'0', text:'期货行情'},
          {value:'1', text:'股票行情'},
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'mdService':
        this.dataList = [
          {value:'0', text:'万得'},
          {value:'1', text:'宏汇'},
          {value:'2', text:'金证'},
          {value:'3', text:'LTS L1'},
          {value:'4', text:'LTS L2'},
          {value:'5', text:'原生L2'},
          {value:'6', text:'CTP'},
          {value:'7', text:'钱龙'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'mdlei1':
        this.dataList = [
          {value:'0', text:'CTP'},
          {value:'1', text:'飞马'},
          {value:'2', text:'金飞鼠'},
          {value:'3', text:'UFT'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;
      case 'mdlei2':
        this.dataList = [
          {value:'0', text:'恒生'},
          {value:'1', text:'金证'},
          {value:'2', text:'顶点'},
          {value:'3', text:'金仕达'},
          {value:'4', text:'LTS'},
          {value:'5', text:'CTP'},
          {value:'6', text:'深证通'},
          {value:'7', text:'讯投'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
        }
        break;

      case 'fmode':
        this.dataList = [
          {value:'1', text:'单位手'},
          {value:'2', text:'成交额'}
        ];
        if(this.viewType == 'select_all') {
          this.dataList.unshift( {value:'', text:'全部'} );
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
