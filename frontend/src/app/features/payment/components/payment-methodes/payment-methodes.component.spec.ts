import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodesComponent } from './payment-methodes.component';

describe('PaymentMethodesComponent', () => {
  let component: PaymentMethodesComponent;
  let fixture: ComponentFixture<PaymentMethodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodesComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
