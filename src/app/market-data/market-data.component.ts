import { Component, OnInit } from '@angular/core';
import {MarketDataService} from "./market-data.service";
import {MarketDataPage, MarketData} from "./market-data";

declare var $ : any;

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css']
})
export class MarketDataComponent implements OnInit {

  searchPlatId : string = '';

  curPage : number = 1;

  marketDataPage : MarketDataPage;

  curMarketData : MarketData;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private marketDataService : MarketDataService
  ) { }

  ngOnInit() {

    this.curMarketData = {
      platId : '',
      symbolType : '',
      symbolId : ''
    };

  }

  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddMarketData() {

    this.isAddEditor = true;
    this.editorTitle = '新增行情订阅';

    this.curMarketData = { //初始化行情数据
      platId : '',
      symbolType : '',
      symbolId : ''
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditMarketData(value : MarketData) {

    this.isAddEditor = false;
    this.editorTitle = '编辑行情订阅';

    this.curMarketData = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteMarketData(value : MarketData) {

    this.curMarketData = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增行情数据

      this.marketDataService.addMarketData(this.curMarketData)
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

  }

  delete() {

    this.marketDataService.removeMarketData(this.curMarketData)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.marketDataService.getMarketDataPage(this.searchPlatId, this.curPage)
      .then( page => this.marketDataPage = page );

  }


}
