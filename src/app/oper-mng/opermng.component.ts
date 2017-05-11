import {Component, OnInit} from '@angular/core';
import {OperMngService} from "./opermng.service";
import {OperatorPage, Operator, OperAccount} from "./operator";
import {BaseComponent} from "../common/base.component";
import {AccountService} from "../account/account.service";
import {errorComparator} from "tslint/lib/test/lintError";

declare var $ : any;

@Component({
  selector: 'app-opermng',
  templateUrl: './opermng.component.html'
})

export class OperMngComponent extends BaseComponent implements OnInit {

  searchOperName:string = '';

  curPage:number = 1;

  searchAcctId : string = '';
  allAcctList : OperAccount[] = [];

  operPage : OperatorPage;
  curOper : Operator;

  editorTitle : string = '';
  isAddEditor : boolean;
  isDialogShowing : boolean = false;

  constructor(private operService : OperMngService, private acctService : AccountService) { super(); }

  ngOnInit() {

    this.curOper = {

      sysUserId : '',
      userName : '',
      userNo : '',
      remark : '',
      roleId : '',
      roleName : '',
      userAccountList : []

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

  private queryList() {

    this.operService.getOperators(this.searchOperName, this.curPage)
      .then( res => {
        if(res[0]) {
          this.operPage = res[1];
        }
        else {
          this.alert.error(res[1]);
        }
      })
      .catch( error => this.alert.error(error[1]));

  }

  loadAllAccounts() {

    this.acctService.getAccountsInOnePage(this.searchAcctId)
      .then( res => {

        this.allAcctList = [];

        for(let acct of res) {

          let operAcct = new OperAccount();

          operAcct.accountId = acct.accountId;
          operAcct.platId = acct.platId;
          operAcct.userId = acct.userId;
          operAcct.active = false;

          this.allAcctList.push( operAcct );

        }

      }).catch(error => this.alert.error(error));

  }

  onAcctItemClick(acct : OperAccount) {

    acct.active = !acct.active;

  }

  addAcct() {

    for(let acct of this.allAcctList.filter(ele => ele.active == true)) {

      if(this.curOper.userAccountList.findIndex(at => at.accountId == acct.accountId) == -1) {

        this.curOper.userAccountList.push(JSON.parse(JSON.stringify(acct)) );
        acct.active = false;

      }

    }

  }

  addAllAcct() {

    for(let acct of this.allAcctList) {

      if(this.curOper.userAccountList.findIndex(at => at.accountId == acct.accountId) == -1) {

        this.curOper.userAccountList.push(JSON.parse(JSON.stringify(acct)) );
        acct.active = false;

      }

    }

  }

  deleteAcct() {

    while(true) {

      let index = this.curOper.userAccountList.findIndex(at => at.active == true);

      if( index != -1) {
        this.curOper.userAccountList.splice(index, 1);
      } else {
        break;
      }

    }

  }

  onAddOperator() {

    this.isAddEditor = true;
    this.editorTitle = '新增操作员';
    this.isDialogShowing = true;
    this.searchAcctId = '';

    this.curOper = {

      sysUserId : '',
      userName : '',
      userNo : '',
      remark : '',
      roleId : '',
      roleName : '',
      userAccountList : []

    };


    $('#data_editor').modal('show'); //显示编辑对话框

    this.loadAllAccounts();

  }

  onEditOperator(sysUserId){

    this.operService.getOperator(sysUserId)
      .then( res => {

        if(res[0]) {
          this.curOper = res[1];

          this.isAddEditor = false;
          this.editorTitle = '编辑操作员信息';
          this.isDialogShowing = true;
          this.searchAcctId = '';


          $('#data_editor').modal('show'); //显示编辑对话框

          this.loadAllAccounts();

        } else {
          this.alert.error(res[1]);
        }

      }).catch(error => this.alert.error(error));
  }

  onDeleteOper(oper) {

    this.curOper = oper;
    $('#delete_confirm').modal('show'); //显示删除对话框

  }

  delete() {

    this.operService.removeOperator(this.curOper)
      .then( res => {

        if(res[0]) {

          this.alert.info("删除成功！");
          this.curPage = 1;
          this.queryList();

        } else {

          this.alert.error(res[1]);

        }

      })
      .catch( error => this.alert.error(error[1]));

    $('#delete_confirm').modal('hide');

  }

  save() {

    if(this.isAddEditor) {

      this.operService.addOperator(this.curOper)
        .then(res => {

          if(res[0]) {
            $('#data_editor').modal('hide');
            this.alert.info(res[1]);
          } else {
            this.alert.error(res[1]);
          }

        }).catch(error => this.alert.error(error));

    } else {

      this.operService.editOperator(this.curOper)
        .then(res => {

          if(res[0]) {
            $('#data_editor').modal('hide');
            this.alert.info(res[1]);
          } else {
            this.alert.error(res[1]);
          }

        }).catch(error => this.alert.error(error));

    }

  }


}
