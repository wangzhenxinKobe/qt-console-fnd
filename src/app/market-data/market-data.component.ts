import { Component, OnInit } from '@angular/core';
import {MarketDataService} from "./market-data.service";
import {MarketDataPage, MarketData} from "./market-data";
import { FileUploader } from 'ng2-file-upload';

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
  uploader : FileUploader = new FileUploader({
    url: "http://192.168.0.65:8077/upload?serviceCode=FS034",
    method: "POST",
    itemAlias: "file"
  });
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

  selectedFileOnChanged(event:any) {

    console.log(event.target.value);
    // 这里是文件选择完成后的操作处理
    this.uploader.queue[0].onSuccess = (response, status, headers) => {

      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        console.info(tempRes);
        alert(tempRes.errMsg);
      }else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传

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
