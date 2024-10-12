import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesEtudiantsComponent } from './pages-etudiants.component';

describe('PagesEtudiantsComponent', () => {
  let component: PagesEtudiantsComponent;
  let fixture: ComponentFixture<PagesEtudiantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesEtudiantsComponent]
    });
    fixture = TestBed.createComponent(PagesEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
