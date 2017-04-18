
import {Component} from '@angular/core';
import {Strategy} from "./strategy";
import {StrategyService} from "./strategy.service";

declare var $;

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-editor.component.html'
})

export class StrategyEditorComponent {

  strategy : Strategy;

  title : string;
  displayParam : boolean;

  constructor( private strategyService : StrategyService ){}

  show() {

    if(this.strategy) { //配置策略

      this.title = '配置策略';
      this.displayParam = true;

      //获取策略参数列表
      this.strategyService.getStrategyParam(this.strategy)
        .then( params => {
          this.strategy.paraList = params;
          $('#addCelue').modal();
        });

    } else { //新增策略

      this.title = '新增策略';
      this.displayParam = false;

      $('#addCelue').modal();
    }


  }

  onLoadParam(name) {

  }

}
