import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFormationPresentielleComponent } from './inscription-formation-presentielle.component';

describe('InscriptionFormationPresentielleComponent', () => {
  let component: InscriptionFormationPresentielleComponent;
  let fixture: ComponentFixture<InscriptionFormationPresentielleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionFormationPresentielleComponent]
    });
    fixture = TestBed.createComponent(InscriptionFormationPresentielleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
