import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AccountService} from "../account/account.service";

@Component({
    selector: 'app-account-sel',
    template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option *ngFor="let item of accountList" value="{{item.groupId}}">{{item.groupName}}</option>
    </select>

    <div *ngIf="viewType == 'readonly'">{{curTdservice?.userId}}</div>
    
    `
})
export class AccountSelComponent implements OnInit{

  @Input()
  value:string;
  @Output()
  valueChange = new EventEmitter<string>();

  @Input() viewType : string;

  accountList : any[] = [];
  curAccount : any;

  constructor(private accountService : AccountService){}

  // onChange() {
  //
  //   this.valueChange.emit(this.value);
  //
  // }

  ngOnInit() {

    this.accountService.getAllAccount().then( res => {

      this.accountList = Array.from(res);

      if(this.viewType == 'select_all') {

        this.accountList.unshift({paltId:'',deploySite:"全部账户组"});

      }

      if(this.viewType == 'readonly') {

        this.curAccount = this.accountList.find(data => data.groupName == this.value);

      }

    });

  }

}
