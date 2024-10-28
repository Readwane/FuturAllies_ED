import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersManagementComponent } from './offers-management.component';

describe('OffersManagementComponent', () => {
  let component: OffersManagementComponent;
  let fixture: ComponentFixture<OffersManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersManagementComponent]
    });
    fixture = TestBed.createComponent(OffersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
