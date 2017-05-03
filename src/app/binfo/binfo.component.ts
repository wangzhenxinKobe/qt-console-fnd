import { Component, OnInit } from '@angular/core';
import {BinfoService} from "./binfo.service";
import {BinfoPage,Binfo} from "./binfo";
import { FileUploader } from 'ng2-file-upload';

declare var $ : any;

@Component({
  selector: 'app-binfo',
  templateUrl: './binfo.component.html',
  styleUrls: ['./binfo.component.css']
})
export class BinfoComponent implements OnInit {
  searchPlatId : string = '';
  curPage : number = 1;
  binfoPage : BinfoPage;
  curBinfo : Binfo;
  editorTitle : string = '';
  isAddEditor : boolean;
  downloadRequesting : boolean;
  fileUrl : string;

  uploader : FileUploader = new FileUploader({
    url: "http://192.168.0.65:8077/upload?serviceCode=FS010",
    method: "POST",
    itemAlias: "file"
  });

  constructor(
    private binfoService : BinfoService
  ) { }

  ngOnInit() {

    this.curBinfo = {
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : "",


    };
  }

//文件导入
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

  //文件导出中
   downloadFile(value : Binfo) {
     this.downloadRequesting = true;
     $('#requesting').modal('show'); //显示编辑对话框
        this.downloadRequesting=false;
          this.binfoService.exportBinfo(this.curBinfo)
            .then( result => {
              console.info(result);
              if(result[0]) {
                this.fileUrl = result[1];
                alert(result[1]);
              }
              else {
                alert(result[1]);
              }
            });
   }
// //   try{
// //     var elemIF = document.createElement("iframe");
// //     elemIF.src = url;
// //     elemIF.style.display = "none";
// //     document.body.appendChild(elemIF);
// //
// //   }catch(e){
// //   alert("导出出错");
// //   }





  search() {

    this.curPage = 1;
    this.queryList();

  }

  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  onAddBinfo() {

    this.isAddEditor = true;
    this.editorTitle = '新增股票基本信息';

    this.curBinfo = { //初始化期货数据
      stockCode :"",
      stockName :"",
      exchangeId :"",
      flowVolume : 0,
      allVolume : 0,
      stockBoard : 0,
      isFund : "",
      isIndex : "",

    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onEditBinfo(value : Binfo) {

    this.isAddEditor = false;
    this.editorTitle = '编辑股票基本信息';

    this.curBinfo = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteBinfo(value : Binfo) {

    this.curBinfo = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.binfoService.addBinfo(this.curBinfo)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      this.binfoService.updateBinfo(this.curBinfo)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.binfoService.removeBinfo(this.curBinfo)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.binfoService.getBinfoPage(this.searchPlatId, this.curPage)
      .then( page => this.binfoPage = page );

  }


}

