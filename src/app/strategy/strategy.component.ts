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

  constructor( private strategyService : StrategyService ) { }

  ngOnInit() {
  }

  private queryList() {

    this.strategyService.getStrategies(this.searchPlatId, this.searchStrategyType, this.searchStrategyName, this.curPage)
      .then( page => this.strategyPage = page );

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
