import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingApplicationComponent } from './training-application.component';

describe('TrainingApplicationComponent', () => {
  let component: TrainingApplicationComponent;
  let fixture: ComponentFixture<TrainingApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
