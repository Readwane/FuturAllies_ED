import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmPaymentComponent } from './om-payment.component';

describe('OmPaymentComponent', () => {
  let component: OmPaymentComponent;
  let fixture: ComponentFixture<OmPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OmPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
