/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { StrategyService } from './strategy.service.ts';
import {Strategy, StrategyPage} from "./strategy";

declare var $ ;

describe('StrategyService', () => {


  beforeEach(() => { TestBed.configureTestingModule({ imports: [HttpModule], providers: [StrategyService] }); });


  it("#getStrategies() testing ", async(inject([StrategyService], (service: StrategyService) => {

    let plat_id = '101';
    let strategy_type = '0';
    let strategy_name = 'RG';
    let current_page = '1';

    service.getStrategies(plat_id, strategy_type, strategy_name, current_page).then( (value : StrategyPage) =>{

      expect(value).toEqual(jasmine.anything());

      if(value) {

        $.each(value.strategies, function(i, strategy) {

          console.info(`***********|第${i+1}条，author[${strategy.author}]comment[${strategy.comment}]platId[${strategy.platId}]strategyName[${strategy.strategyName}]` +
            `strategyType[${strategy.strategyType}]strategyVer[${strategy.strategyVer}]winFile[${strategy.winFile}]`);

        });

        console.info(`***********|totalPages = ${value.totalPages}`);
        console.info(`***********|totalRows = ${value.totalRows}`);
      }

    });

  })));


});


