import {Component, ViewChild, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import {RolePage, Role} from "./role";
import {OproleService} from "./oprole.service";
import {AlertComponent} from "../elements/alert.component";
import {BaseComponent} from "../common/base.component";

declare var $ : any;

@Component({
    selector: 'app-oprole',
    templateUrl: './oprole.component.html'
})

export class OproleComponent extends BaseComponent implements OnInit{

  searchRoleName : string = '';

  curPage : number = 1;

  rolePage : RolePage;
  curRole : Role;

  constructor(private oproleService : OproleService,
              private route : ActivatedRoute,
              private router : Router){ super(); }

  ngOnInit() {

    this.searchRoleName = this.route.snapshot.params['name'];

    if(this.searchRoleName) this.search();

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

    this.oproleService.getRoles(this.searchRoleName, this.curPage)
      .then( res => {
        if(res[0]) {
          this.rolePage = res[1];
        }
        else {
          this.alert.error(res[1]);
        }
      })
      .catch( error => this.alert.error(error[1]));

  }

  onAddRole() {

    this.router.navigate(['/buz/oprole-detail']);

  }

  onEditRole(roleId){

    this.router.navigate(['/buz/oprole-detail', {id : roleId}]);

  }

  onDeleteRole(role) {

    this.curRole = role;
    $('#delete_confirm').modal('show'); //显示删除对话框

  }

  delete() {

    this.oproleService.removeRole(this.curRole)
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
