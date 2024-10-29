import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMobileFormComponent } from './payment-mobile-form.component';

describe('PaymentMobileFormComponent', () => {
  let component: PaymentMobileFormComponent;
  let fixture: ComponentFixture<PaymentMobileFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMobileFormComponent]
    });
    fixture = TestBed.createComponent(PaymentMobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
