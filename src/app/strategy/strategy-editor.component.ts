
import {Component} from '@angular/core';
import {Strategy, StrategyParam} from "./strategy";
import {StrategyService} from "./strategy.service";
import {BaseComponent} from "../common/base.component";

declare var $;

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-editor.component.html'
})

export class StrategyEditorComponent extends BaseComponent {

  strategy : Strategy;

  title : string;
  displayParam : boolean;
  isAdd : boolean;

  constructor( private strategyService : StrategyService ){ super(); }

  show() {

    if(this.strategy) { //配置策略

      this.title = '配置策略';
      this.displayParam = true;
      this.isAdd = false;

      //获取策略参数列表
      this.strategyService.getStrategyByName(this.strategy.strategyName)
        .then( res => {

          if(res[0]) {
            this.strategy = res[1];
            $('#addCelue').modal();
          } else {
            this.alert.error(res[1]);
          }

        }).catch(error => this.alert.error(error));

    } else { //新增策略

      this.title = '新增策略';
      this.displayParam = false;
      this.isAdd = true;

      $('#addCelue').modal();
    }


  }

  onLoadParam(name) {

    this.loading.show();

    this.strategyService.syncStrategyParam(name)
      .then( res => {

        if(res[0]) {

          this.asyncTimer( () => {

            return this.strategyService.loadStrategyParam(name)
              .then( res => { //参数导入成功

                if(res[0]) {

                  this.strategy = {
                    strategyName : name,
                    platId : '',
                    strategyType : '',
                    winFile : '',
                    strategyVer : 'v1.0.0',
                    author : '',
                    comment : '',
                    fieldList : res[1]
                  };
                  this.displayParam = true;
                  return true;

                } else {

                  this.alert.error(res[1]);
                  return false;

                }

              })
              .catch( error => {
                this.alert.error(error);
                return false;
              });

          });

        } else {

          this.alert.error(res[1]);

        }

      })
      .catch(error => this.alert.error(error));

  }

  saveStrategy() {

    console.info(this.strategy);
    this.strategyService.addStrategy(this.strategy)
      .then( res => {

        if(res[0]) {

          this.alert.info("策略新增成功！");
          this.isAdd = false;

        } else {

          this.alert.error(res[1]);

        }

      })
      .catch(error => this.alert.error(error));

  }

  saveParam(param : StrategyParam) {

    if(this.isAdd) return ;

    this.strategyService.updateStrategyParam(this.strategy.strategyName, param.paraName, param.paraValue)
      .then( result => {
        if(result[0]) {

          this.alert.info("保存成功！");

        } else {

          this.alert.error(`保存失败![${result[1]}]`);

          //更新记录
          this.strategyService.getStrategyByName(this.strategy.strategyName)
            .then( stratety => this.strategy = stratety[1] );

        }
      });

  }

}
