import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationEnrollmentComponent } from './certification-enrollment.component';

describe('CertificationEnrollmentComponent', () => {
  let component: CertificationEnrollmentComponent;
  let fixture: ComponentFixture<CertificationEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationEnrollmentComponent]
    });
    fixture = TestBed.createComponent(CertificationEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
