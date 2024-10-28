import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTakingComponent } from './course-taking.component';

describe('CourseTakingComponent', () => {
  let component: CourseTakingComponent;
  let fixture: ComponentFixture<CourseTakingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTakingComponent]
    });
    fixture = TestBed.createComponent(CourseTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
