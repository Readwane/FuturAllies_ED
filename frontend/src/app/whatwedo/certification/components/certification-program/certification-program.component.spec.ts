import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationProgramComponent } from './certification-program.component';

describe('CertificationProgramComponent', () => {
  let component: CertificationProgramComponent;
  let fixture: ComponentFixture<CertificationProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationProgramComponent]
    });
    fixture = TestBed.createComponent(CertificationProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
