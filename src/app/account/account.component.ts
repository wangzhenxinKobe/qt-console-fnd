import { Component, OnInit } from '@angular/core';
import {AccountService} from "./account.service";
import {AccountPage, Account} from "./account";

declare var $ : any;

@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {




  searchPlatId : string = '';

  curPage : number = 1;

  accountPage : AccountPage;

  curAccount : Account;
  editorTitle : string = '';
  isAddEditor : boolean;

  constructor(
    private accountService : AccountService
  ) { }

  ngOnInit() {

    this.curAccount = {
    accountId : 0,
    platId :0,
    serviceId : 0,
    userId : "",
    tradePassword : "",
    fundCode  : "",
    commAccount : '',
    commPassword :"",
    flowPath : "",
    isauth :"0",
    userProductInfo  : "",
    inverstorId :"" ,
      ratio :0 ,
      groupName :"",
      groupId : ""



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

  onAddAccount() {

    this.isAddEditor = true;
    this.editorTitle = '新增交易账户';
    this.curAccount = { //初始化交易账户
      accountId : 1,
      platId : 1,
      serviceId : 1,
      userId : "",
      tradePassword : "",
      fundCode  : "",
      commAccount : '',
      commPassword :"",
      flowPath : "",
      isauth :"0",
      userProductInfo  : "",
      inverstorId :"" ,
      ratio :0 ,
      groupName :"",
      groupId : "",



    };


    // if($("#yesno option:selected").text() == "否"){
    //   $("#fc").attr("disabled",true);
    // }else{
    //   $("#fc").attr("disabled",false);
    // }

    $("#fc").attr("disabled",true);
    $('#data_editor').modal('show'); //显示编辑对话框

  }

  demo1(){

    if($("#yesno option:selected").text() == "否"){
      $("#fc").attr("disabled",true);
    }
    if($("#yesno option:selected").text() == "是"){
      $("#fc").attr("disabled",false);
    }
  }




  onEditAccount(value : Account) {

    this.isAddEditor = false;
    this.editorTitle = '编辑交易账户维护';

    this.curAccount = value;

    $('#data_editor').modal('show'); //显示编辑对话框

  }

  onDeleteAccount(value : Account) {

    this.curAccount = value;

    $('#delete_confirm').modal('show'); //显示编辑对话框

  }

  save() {

    if(this.isAddEditor) { //新增行情数据

      this.curPage = 1;
      this.accountService.addAccount(this.curAccount)
        .then(result => result ? this.queryList() : alert("数据新增失败，请重试！"));

    } else { //修改行情数据

      this.accountService.updateAccount(this.curAccount)
        .then( result => result ? this.queryList() : alert("数据修改失败，请重试！") );

    }

    $('#data_editor').modal('hide');

  }

  delete() {

    this.accountService.removeAccount(this.curAccount)
      .then( result => result ? this.queryList() : alert("数据删除失败，请重试！") );

    $('#delete_confirm').modal('hide');

  }

  private queryList() {

    console.info(`searchPlatId[${this.searchPlatId}], curPage[${this.curPage}]`);

    this.accountService.getAccountPage(this.searchPlatId, this.curPage)
      .then( page => this.accountPage = page );

  }


}
