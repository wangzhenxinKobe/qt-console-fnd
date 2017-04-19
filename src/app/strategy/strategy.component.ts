import { Component, OnInit, ViewChild } from '@angular/core';
import {StrategyEditorComponent} from "./strategy-editor.component";
import {Strategy, StrategyPage} from "./strategy";
import {StrategyService} from "./strategy.service";

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {

  @ViewChild(StrategyEditorComponent)
  public readonly strategyEditorModal : StrategyEditorComponent;

  searchPlatId : string = '';
  searchStrategyType : string = '';
  searchStrategyName : string = '';
  curPage : number = 1;

  strategyPage : StrategyPage;
  curStrategy : Strategy;

  constructor( private strategyService : StrategyService ) { }

  ngOnInit() {
  }

  search() {

    console.info(`curPlatId[${this.searchPlatId}], curStrategyType[${this.searchStrategyType}], curStrategyName[${this.searchStrategyName}], curPage[${this.curPage}]`);

    this.curPage = 1;

    this.strategyService.getStrategies(this.searchPlatId, this.searchStrategyType, this.searchStrategyName, this.curPage)
      .then( page => this.strategyPage = page );

  }

  onPage(event) {

    this.curPage = event;
    this.search();

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
