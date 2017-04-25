import { Component, OnInit } from '@angular/core';
import {SbasketService} from "./sbasket.service";
import {SbasketPage,Sbasket} from "./sbasket";
import { FileUploader } from 'ng2-file-upload';

declare var $ : any;

@Component({
  selector: 'app-sbasket',
  templateUrl: './sbasket.component.html',
  styleUrls: ['./sbasket.component.css']
})
export class SbasketComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  sbasketPage : SbasketPage;

  curSbasket : Sbasket;
  editorTitle : string = '';
  isAddEditor : boolean;

  uploader : FileUploader = new FileUploader({
    url: "http://192.168.0.65:8077/upload",
    method: "POST",
    itemAlias: "file"
  });

  constructor(
    private sbasketService : SbasketService
  ) { }

  ngOnInit() {
   this.curSbasket = {
   stockCode : "",
   basketName : "",
   weight : "",
   volume : 0,
   errCode1  : "",
   volume1 : 0
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
  // uploadFile(){
  //
  // }

  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddSindex() {

    this.isAddEditor = true;
    this.editorTitle = '新增期货';

    this.curSbasket = { //初始化期货数据
      stockCode : "",
      basketName : "",
      weight : "",
      volume : 0,
      errCode1  : "",
      volume1 : 0
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditSbasket(value : Sbasket) {

    this.isAddEditor = false;
    this.editorTitle = '编辑股票篮子';

    this.curSbasket = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteSbasket(value : Sbasket) {

    this.curSbasket = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.sbasketService.addSbasket(this.curSbasket)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      this.sbasketService.updateSbasket(this.curSbasket)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.sbasketService.removeSbasket(this.curSbasket)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.sbasketService.getSbasketPage(this.searchPlatId, this.curPage)
      .then( page => this.sbasketPage = page );

  }


}
