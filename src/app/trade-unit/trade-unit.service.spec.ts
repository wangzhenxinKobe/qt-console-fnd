/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TradeUnitService } from './trade-unit.service.ts';

describe('TradeUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeUnitService]
    });
  });

  it('should ...', inject([TradeUnitService], (service: TradeUnitService) => {
    expect(service).toBeTruthy();
  }));
});
