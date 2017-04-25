
import {Component, Output, Input, OnInit, EventEmitter} from '@angular/core';
import {Strategy} from "../strategy/strategy";

@Component({
    selector: 'app-strategy-select',
    template: `
    
    <select [(ngModel)]="value" class="form-control" (change)="onChange()">
      <option value="{{obj.value}}">{{obj.text}}</option>
    </select>
    
    `
})

export class StrategySelectComponent implements OnInit {

  strategies : Strategy[];

  @Input() value : string;
  @Output() valueChange = new EventEmitter<string>();

  @Output() change = new EventEmitter();

  @Input() viewType : string;

  onChange() {

    this.valueChange.emit(this.value);
    this.change.emit();

  }

  ngOnInit() {

    //获取全部策略列表

/*
    if (this.viewType == 'select_all') {
      this.strategies.unshift({value: '', text: '全部策略'});
    }
*/
  }

}
