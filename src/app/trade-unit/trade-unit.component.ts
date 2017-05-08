import { Component, OnInit } from '@angular/core';
import {TradeUnitPage, TradeUnit, TradeUnitParam, TradeUnitAcct} from "./trade-unit";
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
  isDialogShowing : boolean = false;


  constructor(
    private tradeUnitService : TradeUnitService,
    private strategyService : StrategyService
  ) { super(); }

  ngOnInit() {
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

    $('#data_editor').on('show.bs.modal', () => {this.isDialogShowing = true;});
    $('#data_editor').on('hide.bs.modal', () => {this.isDialogShowing = false;});

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
    this.isDialogShowing = true;


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

  onSaveTradeUnit() {

    if(!this.isAddEditor) return;

    this.loading.show();

    this.tradeUnitService.addTradeUnit(this.curTradeUnit)
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("交易单元新增成功");
                  this.isAddEditor = false;
                  return true;
                } else {
                  this.alert.error(`交易单元新增失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`交易单元新增失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`交易单元新增失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`交易单元新增失败！[${error}]`));

  }

  onEditTradeUnit(trade_unit : TradeUnit) {

    this.tradeUnitService.getTrandUnit(trade_unit.tradeUnitId)
      .then( res => {

        if(res[0]) {
          this.curTradeUnit = res[1];

          this.isAddEditor = false;
          this.editorTitle = '编辑交易单元';
          this.isLoaded = true;
          this.isDialogShowing = true;


          $('#data_editor').modal('show'); //显示编辑对话框

        } else {
          this.alert.error(res[1]);
        }

      }).catch(error => this.alert.error(error));

  }

  onStartTradeUnit(trade_unit : TradeUnit) {

    if(!trade_unit) return;

    this.loading.show();

    this.tradeUnitService.startTradeUnit(trade_unit.tradeUnitId)
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("交易单元启动成功");
                  return true;
                } else {
                  this.alert.error(`交易单元启动失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`交易单元启动失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`交易单元启动失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`交易单元启动失败！[${error}]`));

  }

  onStopTrandeUnit(trade_unit : TradeUnit) {

    if(!trade_unit) return;

    this.loading.show();

    this.tradeUnitService.stopTradeUnit(trade_unit.tradeUnitId)
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("交易单元停止成功");
                  return true;
                } else {
                  this.alert.error(`交易单元停止失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`交易单元停止失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`交易单元停止失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`交易单元停止失败！[${error}]`));

  }

  onNewAccount() {

    let acct = new TradeUnitAcct();
    acct.isSaved = false;
    this.curTradeUnit.accountList.push(acct);

  }

  onSaveAccount(index) {

    let acct : TradeUnitAcct = this.curTradeUnit.accountList[index];

    if(acct.userId.trim().length == 0 || acct.accountType.trim().length == 0) {
      this.alert.warn("用户代码或账户类型不能为空！");
      return;
    }

    this.loading.show();

    this.tradeUnitService.addTradeUnitAccounts(this.curTradeUnit.tradeUnitId, [acct])
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("交易账户新增成功");
                  acct.isSaved = true;
                  return true;
                } else {
                  this.alert.error(`交易账户新增失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`交易账户新增失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`交易账户新增失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`交易账户新增失败！[${error}]`));

  }

  onDeleteAccount(index) {

    let acct : TradeUnitAcct = this.curTradeUnit.accountList[index];

    if(!acct) {
      this.alert.warn("无账户记录!");
      return;
    }

    if(!acct.isSaved) { //对于未保存的账户记录，直接删除
      this.curTradeUnit.accountList.splice(index, 1);
      return;
    }

    this.loading.show();

    this.tradeUnitService.deleteTradeUnitAccounts(this.curTradeUnit.tradeUnitId, [acct])
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("交易账户删除成功");
                  this.curTradeUnit.accountList.splice(index, 1);
                  return true;
                } else {
                  this.alert.error(`交易账户删除失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`交易账户删除失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`交易账户删除失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`交易账户删除失败！[${error}]`));
  }

  onSaveParam(param : TradeUnitParam) {

    this.loading.show();

    this.tradeUnitService.updateTradeUnitParam(this.curTradeUnit.tradeUnitId, [param])
      .then(res => {
        if(res[0]) {

          this.asyncTimer(()=>{

            return this.tradeUnitService.getServerResponse(res[1])
              .then( res => {

                if(res[0]){
                  this.alert.info("参数保存成功");
                  return true;
                } else {
                  this.alert.error(`参数保存失败！[${res[1]}]`);
                  return false;
                }

              }).catch(error => {this.alert.error(`参数保存失败！[${error}]`); return false;});

          });

        } else {
          this.alert.error(`参数保存失败！[${res[1]}]`);
        }
      }).catch(error => this.alert.error(`参数保存失败！[${error}]`));

  }

  private queryList() {

    this.tradeUnitService.getTradeUnits(this.searchPlatId, this.searchStrategyName, this.searchTradeUnitName, this.curPage)
      .then( res => res[0] ? this.tradeUnitPage = res[1] : this.alert.error(res[1]) )
      .catch( error => this.alert.error(error));

  }


}
