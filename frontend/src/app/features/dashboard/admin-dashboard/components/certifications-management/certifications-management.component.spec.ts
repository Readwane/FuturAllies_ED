import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsManagementComponent } from './certifications-management.component';

describe('CertificationsManagementComponent', () => {
  let component: CertificationsManagementComponent;
  let fixture: ComponentFixture<CertificationsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationsManagementComponent]
    });
    fixture = TestBed.createComponent(CertificationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
