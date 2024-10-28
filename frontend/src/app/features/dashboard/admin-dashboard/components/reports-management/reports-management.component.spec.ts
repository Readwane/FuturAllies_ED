import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsManagementComponent } from './reports-management.component';

describe('ReportsManagementComponent', () => {
  let component: ReportsManagementComponent;
  let fixture: ComponentFixture<ReportsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsManagementComponent]
    });
    fixture = TestBed.createComponent(ReportsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
