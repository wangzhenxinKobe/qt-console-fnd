import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TplatformService} from "../tplatform/tplatform.service";

@Component({
    selector: 'app-platform-sel',
    template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option *ngFor="let item of platformList" value="{{item.platId}}">{{item.platId}}{{item.deploySite}}</option>
    </select>

    <div *ngIf="viewType == 'readonly'">{{curPlatform?.deploySite}}</div>
    
    `
})
export class PlatformSelComponent implements OnInit{

  @Input()
  value:string;
  @Output()
  valueChange = new EventEmitter<string>();

  @Input() viewType : string;

  platformList : any[] = [];
  curPlatform : any;

  constructor(private platformService : TplatformService){}

  onChange() {

    this.valueChange.emit(this.value);

  }

  ngOnInit() {

    this.platformService.getAllTransPlatform().then( res => {

      this.platformList = Array.from(res);

      if(this.viewType == 'select_all') {

        this.platformList.unshift({paltId:'',deploySite:"全部交易平台"});

      }

      if(this.viewType == 'readonly') {

        this.curPlatform = this.platformList.find(data => data.platId == this.value);

      }

    });

  }

}
