import { Component, OnInit } from '@angular/core';
import {FuturesService} from "./futures.service";
import {FuturesPage,Futures} from "./futures";
import { FileUploader } from 'ng2-file-upload';
import {BaseComponent} from "../common/base.component";
declare var $ : any;

@Component({
  selector: 'app-futures',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent extends BaseComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  futuresPage : FuturesPage;

  curFutures : Futures;
  editorTitle : string = '';
  isAddEditor : boolean;
  // futuresList : Futures[];

  uploader : FileUploader = new FileUploader({
    url: "http://192.168.0.65:8077/upload?serviceCode=FS028",
    method: "POST",
    itemAlias: "file"
  });

  constructor(
    private futuresService : FuturesService
  ) { super();}

  ngOnInit() {

    this.curFutures = {
      exchangeId :"0",
      productId :"",
      productName :"",
      volumeMultiple : 0,
      priceTick : 0,
      feeMode : 1,
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

  onAddFutures() {

    this.isAddEditor = true;
    this.editorTitle = '新增期货';

    this.curFutures = { //初始化期货数据
      exchangeId :"0",
      productId :"",
      productName :"",
      volumeMultiple : 0,
      priceTick : 0,
      feeMode : 1,
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditFutures(value : Futures) {

    this.isAddEditor = false;
    this.editorTitle = '编辑期货';

    this.curFutures = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteFutures(value : Futures) {

    this.curFutures = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.futuresService.addFutures(this.curFutures)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      this.futuresService.updateFutures(this.curFutures)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.futuresService.removeFutures(this.curFutures)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');
    this.alert.info("删除成功！");
  }

  rfresh(){
    // window.location.reload();

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.futuresService.getFuturesPage(this.searchPlatId, this.curPage)
      .then( page => this.futuresPage = page );

  }


}
