import { Component, OnInit } from '@angular/core';
import {TradeUnitPage, TradeUnit, TradeUnitParam} from "./trade-unit";
import {TradeUnitService} from "./trade-unit.service";
import {StrategyService} from "../strategy/strategy.service";
import {Strategy} from "../strategy/strategy";
import {BaseComponent} from "../common/base.component";

declare var $ : any;

@Component({
  selector: 'app-trade-unit',
  templateUrl: './trade-unit.component.html',
  styleUrls: ['./trade-unit.component.css']
})
export class TradeUnitComponent extends BaseComponent implements OnInit {

  //查询条件
  searchPlatId : string = '';
  searchStrategyName : string = '';
  searchTradeUnitName : string = '';

  curPage : number = 1;

  tradeUnitPage : TradeUnitPage;

  curTradeUnit : TradeUnit;
  editorTitle : string = '';
  isAddEditor : boolean;
  isLoaded : boolean = false;


  constructor(
    private tradeUnitService : TradeUnitService,
    private strategyService : StrategyService
  ) { super(); }

  ngOnInit() {
  }

  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddTradeUnit() {

    this.isAddEditor = true;
    this.editorTitle = '新增交易单元';
    this.isLoaded = false;

    this.curTradeUnit = { //初始化行情数据
      tradeUnitId : '',
      platId : '',
      strategyType : '',
      strategyName : '',
      author : '',
      status : '',
      paramList : [],
      accountList : []
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  loadStrategyInfo() {

    if(!this.isAddEditor || this.curTradeUnit.strategyName == '') return ;

    this.strategyService.getStrategyByName(this.curTradeUnit.strategyName)
      .then( (res) => {

        if(res[0]) {

          this.curTradeUnit.strategyName = res[1].strategyName;
          this.curTradeUnit.strategyType = res[1].strategyType;

          this.curTradeUnit.paramList = [];

          for(let strategyParam of res[1].fieldList) {

            let param : TradeUnitParam = new TradeUnitParam();

            param.paraName = strategyParam.paraName;
            param.paraType = strategyParam.paraType;
            param.defaultValue = strategyParam.paraValue;

            this.curTradeUnit.paramList.push(param) ;
          }

          this.curTradeUnit.status = '1';

          this.isLoaded = true;

        } else {
          this.alert.error(res[1]);
        }

      }).catch(error => this.alert.error(error));

  }

  save() {
/*
    if(this.isAddEditor) { //新增交易单元

      this(this.curMarketData)
        .then(result => {
          if(result) {

            this.curPage = 1;
            this.searchPlatId = this.curMarketData.platId;
            this.queryList();

          } else {
            alert("数据新增失败，请重试！");
          }
        });

    } else { //修改行情数据

      this.marketDataService.updateMarketData(this.curMarketData)
        .then( result => {

          if(result) {

            this.searchPlatId = this.curMarketData.platId;
            this.queryList();

          } else {

            alert("数据修改失败，请重试！");

          }

        });

    }

    $('#data_editor').modal('hide');
*/
  }


  private queryList() {

    this.tradeUnitService.getTradeUnits(this.searchPlatId, this.searchStrategyName, this.searchTradeUnitName, this.curPage)
      .then( res => res[0] ? this.tradeUnitPage = res[1] : this.alert.error(res[1]) )
      .catch( error => this.alert.error(error));

  }


}
