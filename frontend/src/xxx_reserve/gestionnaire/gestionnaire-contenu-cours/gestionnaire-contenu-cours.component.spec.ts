import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireContenuCoursComponent } from './gestionnaire-contenu-cours.component';

describe('GestionnaireContenuCoursComponent', () => {
  let component: GestionnaireContenuCoursComponent;
  let fixture: ComponentFixture<GestionnaireContenuCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionnaireContenuCoursComponent]
    });
    fixture = TestBed.createComponent(GestionnaireContenuCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
