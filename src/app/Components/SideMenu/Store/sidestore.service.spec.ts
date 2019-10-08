/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidestoreService } from './sidestore.service';

describe('SidestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidestoreService]
    });
  });

  it('should ...', inject([SidestoreService], (service: SidestoreService) => {
    expect(service).toBeTruthy();
  }));
});
