import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmPaymentComponent } from './mm-payment.component';

describe('MmPaymentComponent', () => {
  let component: MmPaymentComponent;
  let fixture: ComponentFixture<MmPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MmPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
