import {Component, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {Role, SysParentFunc, RoleFunc} from "./role";
import {OproleService} from "./oprole.service";
import {AlertComponent} from "../elements/alert.component";
import {BaseComponent} from "../common/base.component";

declare var $ : any;

@Component({
  selector: 'app-oprole-detail',
  templateUrl: './oprole-detail.component.html'
})

export class OproleDetailComponent extends BaseComponent implements OnInit {

  title : string;
  role : Role;
  allSysFuncs : SysParentFunc[];

  isAdd : boolean;

  constructor(
    private oproleService : OproleService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) { super(); }

  ngOnInit() {

    this.role = {
      roleId : '',
      roleName : '',
      roleDescr : '',
      fieldList : []
    };

    this.oproleService.getAllSysFuncs()
      .then(res => {
        if(res[0]) {
          this.allSysFuncs = res[1];
        }
        else {
          this.alert.error(res[1]);
        }
      })
      .catch(error => this.alert.error(error[1]));

    let roleId = this.route.snapshot.params['id'];

    if(roleId) {

      this.title = '编辑角色';
      this.isAdd = false;

      this.oproleService.getRole(roleId)
        .then(res => {
          if(res[0]) {
            this.role = res[1];
          }
          else {
            this.alert.error(res[1]);
          }
        })
        .catch(error => this.alert.error(error[1]));

    } else {

      this.title = '新增角色';
      this.isAdd = true;

    }

  }

  goback() {

    this.location.back();

  }

  canActive(funcId) : boolean {

   return this.role.fieldList.findIndex( item => {return item.funcId == funcId;}) != -1

  }

  onClickParent(parFuncId) {

    $(`#par_func_${parFuncId}`).siblings('ul').slideToggle('slow');
    $(`#par_func_${parFuncId}`).parent('li').toggleClass('active');

  }

  //对当前角色的权限进行操作
  onClickFunc(func : RoleFunc, parent : SysParentFunc) {

    let index = this.role.fieldList.findIndex( item => {return item.funcId == func.funcId});

    if(index == -1) {
      this.role.fieldList.push(func); //所选权限不在角色清单中，加入清单

      //查找父菜单
      let parIndex = this.role.fieldList.findIndex( par => {return par.funcId == parent.funcId;});
      if(parIndex == -1) {
        let newFunc = new RoleFunc();
        newFunc.funcId = parent.funcId;
        newFunc.funcName = parent.funcName;
        newFunc.pFuncId = parent.pFuncId;
        this.role.fieldList.push(newFunc);
      }

    } else {

      this.role.fieldList.splice(index, 1);  //所选权限在角色清单中，从清单中删除

      //查找父菜单
      let parIndex = this.role.fieldList.findIndex( par => {return par.funcId == parent.funcId;});
      if(parIndex != -1) {

        //是否存在其他相同父菜单的子菜单，如果不存在，删除父菜单
        let otherIndex = this.role.fieldList.findIndex(child => {return child.pFuncId == parent.funcId});
        if(otherIndex == -1)
          this.role.fieldList.splice(parIndex, 1);

      }

    }

  }

  save() {

    console.info(this.role.fieldList);

    if(this.isAdd) {

      this.oproleService.addRole(this.role)
        .then( res => {

          if(res[0]) {

            this.alert.info("新增角色成功！");
            this.router.navigate(['/buz/oprole', {name : this.role.roleName}]);

          } else {

            this.alert.error(res[1]);

          }

        })
        .catch( error => this.alert.error(error[1]));

    } else {

      this.oproleService.editRole(this.role)
        .then( res => {

          if(res[0]) {

            this.alert.info("修改角色成功！");
            this.router.navigate(['/buz/oprole', {name : this.role.roleName}]);

          } else {

            this.alert.error(res[1]);

          }

        })
        .catch( error => this.alert.error(error[1]));

    }

  }

}
