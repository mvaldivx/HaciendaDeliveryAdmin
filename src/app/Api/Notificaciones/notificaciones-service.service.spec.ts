/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificacionesServiceService } from './notificaciones-service.service';

describe('NotificacionesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionesServiceService]
    });
  });

  it('should ...', inject([NotificacionesServiceService], (service: NotificacionesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
