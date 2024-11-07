import { TestBed } from '@angular/core/testing';

import { PaymentLoggingService } from '../payment-logging.service';

describe('PaymentLoggingService', () => {
  let service: PaymentLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
