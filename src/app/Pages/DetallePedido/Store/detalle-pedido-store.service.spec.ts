/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetallePedidoStoreService } from './detalle-pedido-store.service';

describe('DetallePedidoStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetallePedidoStoreService]
    });
  });

  it('should ...', inject([DetallePedidoStoreService], (service: DetallePedidoStoreService) => {
    expect(service).toBeTruthy();
  }));
});
