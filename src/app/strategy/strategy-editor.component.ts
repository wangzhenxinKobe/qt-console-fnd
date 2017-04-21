
import {Component} from '@angular/core';
import {Strategy, StrategyParam} from "./strategy";
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
  isAdd : boolean;

  constructor( private strategyService : StrategyService ){}

  show() {

    if(this.strategy) { //配置策略

      this.title = '配置策略';
      this.displayParam = true;
      this.isAdd = false;

      //获取策略参数列表
      this.strategyService.getStrategyByName(this.strategy.strategyName)
        .then( stratety => {

          this.strategy = stratety;
          $('#addCelue').modal();

        });

    } else { //新增策略

      this.title = '新增策略';
      this.displayParam = false;
      this.isAdd = true;

      $('#addCelue').modal();
    }


  }

  onLoadParam(name) {

  }

  saveParam(param : StrategyParam) {

    if(this.isAdd) return ;

    this.strategyService.updateStrategyParam(this.strategy.strategyName, param.paraName, param.paraValue)
      .then( result => {
        if(result) {

          alert("保存成功！");

        } else {

          alert("保存失败!");

          //更新记录
          this.strategyService.getStrategyByName(this.strategy.strategyName)
            .then( stratety => this.strategy = stratety );

        }
      });

  }

}
