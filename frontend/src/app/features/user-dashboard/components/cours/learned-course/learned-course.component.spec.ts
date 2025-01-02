import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedCourseComponent } from './learned-course.component';

describe('LearnedCourseComponent', () => {
  let component: LearnedCourseComponent;
  let fixture: ComponentFixture<LearnedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnedCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
