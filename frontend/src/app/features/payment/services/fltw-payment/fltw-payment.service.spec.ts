import { TestBed } from '@angular/core/testing';

import { FltwPaymentService } from './fltw-payment.service';

describe('FltwPaymentService', () => {
  let service: FltwPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FltwPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
