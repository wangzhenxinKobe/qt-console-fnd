import { Component, OnInit } from '@angular/core';
import {FuordersService} from "./fuorders.service";
import {FuordersPage,Fuorders} from "./fuorders";


declare var $ : any;

@Component({
  selector: 'app-fuorders',
  templateUrl: './fuorders.component.html',
  styleUrls: ['./fuorders.component.css']
})
export class FuordersComponent implements OnInit {
  searchPlatId : string = '';

  curPage : number = 1;

  fuordersPage : FuordersPage;

  curFuorders : Fuorders;
  editorTitle : string = '';
  isAddEditor : boolean;
  // futuresList : Futures[];



  constructor(
    private fuordersService : FuordersService
  ) { }

  ngOnInit() {

    this.curFuorders = {
      accountId :0,
      symbol :"",
      exchange :"",
      direction :"",
      offset :"",
      hedge :"",
      entrustprice : "",
      entrustVolume : 0,
      orderTradeTppe : ""
    };

  }
//上传
  // selectedFileOnChanged(event:any) {
  //
  //   console.log(event.target.value);
  //   // 这里是文件选择完成后的操作处理
  //   this.uploader.queue[0].onSuccess = (response, status, headers) => {
  //
  //     // 上传文件成功
  //     if (status == 200) {
  //       // 上传文件后获取服务器返回的数据
  //       let tempRes = JSON.parse(response);
  //       console.info(tempRes);
  //       alert(tempRes.errMsg);
  //     }else {
  //       // 上传文件后获取服务器返回的数据错误
  //     }
  //   };
  //   this.uploader.queue[0].upload(); // 开始上传
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

  onAddFutures() {

    this.isAddEditor = true;
    // this.editorTitle = '新增期货';

    this.curFuorders = { //初始化期货数据
      accountId :0,
      symbol :"",
      exchange :"",
      direction :"",
      offset :"",
      hedge :"",
      entrustprice : "",
      entrustVolume : 0,
      orderTradeTppe : ""
    };

    $('#data_editor').modal('show'); //显示编辑对话框

  }





  save() {

    if(this.isAddEditor) { //新增期货数据

      this.curPage = 1;
      this.fuordersService.addFuorders(this.curFuorders)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改期货数据

      // this.fuordersService.updateFuorders(this.curFuorders)
      //   .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    // $('#data_editor').modal('hide');

  }



  rfresh(){
    // window.location.reload();

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    // this.fuordersService.getFuordersPage(this.searchPlatId, this.curPage)
    //   .then( page => this.fuordersPage = page );

  }


}
