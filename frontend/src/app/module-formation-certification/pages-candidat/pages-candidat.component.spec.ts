import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCandidatComponent } from './pages-candidat.component';

describe('PagesCandidatComponent', () => {
  let component: PagesCandidatComponent;
  let fixture: ComponentFixture<PagesCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesCandidatComponent]
    });
    fixture = TestBed.createComponent(PagesCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
