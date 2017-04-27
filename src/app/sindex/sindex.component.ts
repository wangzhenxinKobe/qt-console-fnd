import { Component, OnInit } from '@angular/core';
import {SindexService} from "./sindex.service";
import {SindexPage,Sindex} from "./sindex";
import { FileUploader } from 'ng2-file-upload';

declare var $ : any;

@Component({
  selector: 'app-sindex',
  templateUrl: './sindex.component.html',
  styleUrls: ['./sindex.component.css']
})
export class SindexComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  sindexPage : SindexPage;

  curSindex : Sindex;
  editorTitle : string = '';
  isAddEditor : boolean;

  uploader : FileUploader = new FileUploader({
    url: "http://192.168.0.65:8077/upload?FS016",
    method: "POST",
    itemAlias: "file"
  });

  constructor(
    private sindexService : SindexService
  ) { }

  ngOnInit() {

    this.curSindex = {
      indexName :"",
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : ""

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

  // onAddSindex() {
  //
  //   this.isAddEditor = true;
  //   this.editorTitle = '新增期货';
  //
  //   this.curSindex = { //初始化期货数据
  //     indexName :"",
  //     stockCode :"",
  //     stockName :"",
  //     exchangeId :"",
  //     flowVolume : 0,
  //     allVolume : 0,
  //     stockBoard : 0,
  //     isFund : "",
  //     isIndex : ""
  //   };
  //
  //   $('#data_editor').modal('show'); //显示编辑对话框
  //
  // }

  onEditSindex(value : Sindex) {

    this.isAddEditor = false;
    this.editorTitle = '编辑股票指数';

    this.curSindex = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteSindex(value : Sindex) {

    this.curSindex = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.sindexService.addSindex(this.curSindex)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据
      this.sindexService.updateSindex(this.curSindex)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');


  }


  delete() {

    this.sindexService.removeSindex(this.curSindex)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.sindexService.getSindexPage(this.searchPlatId, this.curPage)
      .then( page => this.sindexPage = page );
    $('body').on('hidden', '.modal', function () {
      $(this).removeData('modal');
    });

  }


}
