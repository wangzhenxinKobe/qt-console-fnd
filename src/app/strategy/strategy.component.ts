import { Component, OnInit, ViewChild } from '@angular/core';
import {StrategyEditorComponent} from "./strategy-editor.component";
import {StrategyPage} from "./strategy";
import {StrategyService} from "./strategy.service";
import {BaseComponent} from "../common/base.component";

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent extends BaseComponent implements OnInit {

  @ViewChild(StrategyEditorComponent)
  public strategyEditorModal : StrategyEditorComponent;

  searchPlatId : string = '';
  searchStrategyType : string = '';
  searchStrategyName : string = '';
  curPage : number = 1;

  strategyPage : StrategyPage;

  constructor( private strategyService : StrategyService ) { super(); }

  ngOnInit() {

    this.search();

  }

  private queryList() {

    this.strategyService.getStrategies(this.searchPlatId, this.searchStrategyType, this.searchStrategyName, this.curPage)
      .then( res => {
        if(res[0]) {
          this.strategyPage = res[1];
        } else {
          this.alert.error(res[1]);
        }
      }).catch(error => this.alert.error(error));

  }

  search() {

    this.curPage = 1;
    this.queryList();

  }
  onPage(event) {

    this.curPage = event;
    this.queryList();

  }

  addStrategy() {

    this.strategyEditorModal.strategy = null;
    this.strategyEditorModal.show();

  }

  editStrategy(strategy) {

    this.strategyEditorModal.strategy = strategy;
    this.strategyEditorModal.show();

  }

}
