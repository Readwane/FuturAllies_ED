import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardFormComponent } from './payment-card-form.component';

describe('PaymentCardFormComponent', () => {
  let component: PaymentCardFormComponent;
  let fixture: ComponentFixture<PaymentCardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCardFormComponent]
    });
    fixture = TestBed.createComponent(PaymentCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
