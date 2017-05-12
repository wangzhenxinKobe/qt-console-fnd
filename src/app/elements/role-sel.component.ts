import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {OproleService} from "../oprole/oprole.service";

@Component({
  selector: 'app-role-sel',
  template: `

    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option *ngFor="let item of roleList" value="{{item.value}}">{{item.value}}{{item.text}}</option>
    </select>

    <div *ngIf="viewType == 'readonly'">{{curRole?.text}}</div>

  `
})
export class RoleSelComponent implements OnInit{

  @Input()
  value:string;
  @Output()
  valueChange = new EventEmitter<string>();

  @Input() viewType : string;

  roleList : any[] = [];
  curRole : any;

  constructor(private oproleService : OproleService){}

  onChange() {

    this.valueChange.emit(this.value);

  }

  ngOnInit() {

    this.oproleService.getAllRoles().then( res => {

      for(let role of res) {

        this.roleList.push({ value : role.roleId, text : role.roleName });

      }

      if(this.viewType == 'select_all') {

        this.roleList.unshift({value:'', text:'全部角色'});

      }

      if(this.viewType == 'readonly') {

        this.curRole = this.roleList.find(data => data.value == this.value);

      }

    });

  }

}
