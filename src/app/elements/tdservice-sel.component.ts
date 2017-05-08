import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TdServiceService} from "../tdService/tdService.service";

@Component({
    selector: 'app-tdservice-sel',
    template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option *ngFor="let item of tdServiceList" value="{{item.accountId}}">{{item.userId}}</option>
    </select>

    <div *ngIf="viewType == 'readonly'">{{curTdservice?.userId}}</div>
    
    `
})
export class TdserviceSelComponent implements OnInit{

  @Input()
  value:string;
  @Output()
  valueChange = new EventEmitter<string>();

  @Input() viewType : string;

  tdServiceList : any[] = [];
  curTdservice : any;

  constructor(private tdserviceService : TdServiceService){}

  onChange() {

    this.valueChange.emit(this.value);

  }

  ngOnInit() {

    this.tdserviceService.getAllTdService().then( res => {

      this.tdServiceList = Array.from(res);

      if(this.viewType == 'select_all') {

        this.tdServiceList.unshift({paltId:'',deploySite:"全部用户"});

      }

      if(this.viewType == 'readonly') {

        this.curTdservice = this.tdServiceList.find(data => data.platId == this.value);

      }

    });

  }

}
