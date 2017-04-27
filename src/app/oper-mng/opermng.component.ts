import {Component, ViewChild, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {AlertComponent} from "../elements/alert.component";
import {OperMngService} from "./opermng.service";
import {OperatorPage, Operator} from "./operator";

declare var $ : any;

@Component({
  selector: 'app-opermng',
  templateUrl: './opermng.component.html'
})

export class OperMngComponent implements OnInit {

  @ViewChild(AlertComponent)
  private readonly alert:AlertComponent;

  searchOperName:string = '';

  curPage:number = 1;

  operPage : OperatorPage;
  curOper : Operator;

  constructor(private operService : OperMngService,
              private route:ActivatedRoute,
              private router:Router) {
  }

  ngOnInit() {

    this.searchOperName = this.route.snapshot.params['name'];

    if (this.searchOperName) this.search();

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

  onAddOperator() {

    this.router.navigate(['/buz/opermng-detail']);

  }

  onEditOperator(sysUserId){

    this.router.navigate(['/buz/opermng-detail', {id : sysUserId}]);

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
}
