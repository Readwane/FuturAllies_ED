import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPourCertificationComponent } from './formation-pour-certification.component';

describe('FormationPourCertificationComponent', () => {
  let component: FormationPourCertificationComponent;
  let fixture: ComponentFixture<FormationPourCertificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationPourCertificationComponent]
    });
    fixture = TestBed.createComponent(FormationPourCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
