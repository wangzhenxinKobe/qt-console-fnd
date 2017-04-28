import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StrategyService} from "../strategy/strategy.service";

@Component({
  selector: 'app-strategy-sel',
  template: `
    
    <select *ngIf="viewType != 'readonly'" [(ngModel)]="value" class="form-control " (change)="onChange()">
      <option *ngFor="let item of strategyList" value="{{item.value}}">{{item.text}}</option>
    </select>

    <div *ngIf="viewType == 'readonly'">{{curStrategy?.text}}</div>
    
    `
})
export class StrategySelComponent implements OnInit{

  @Input()
  value:string;
  @Output()
  valueChange = new EventEmitter<string>();

  @Input() viewType : string;

  strategyList : any[] = [];
  curStrategy : any;

  constructor(private strategyService : StrategyService){}

  onChange() {

    this.valueChange.emit(this.value);

  }

  ngOnInit() {

    this.strategyService.getAllStrategies().then( res => {

      for(let strategy of res) {

        this.strategyList.push({ value : strategy.strategyName, text : strategy.strategyName });

      }

      if(this.viewType == 'select_all') {

        this.strategyList.unshift({value:'', text:'全部策略'});

      }

      if(this.viewType == 'readonly') {

        this.curStrategy = this.strategyList.find(data => data.value == this.value);

      }

    });

  }

}
