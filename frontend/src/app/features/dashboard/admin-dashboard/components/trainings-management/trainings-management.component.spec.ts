import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsManagementComponent } from './trainings-management.component';

describe('TrainingsManagementComponent', () => {
  let component: TrainingsManagementComponent;
  let fixture: ComponentFixture<TrainingsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsManagementComponent]
    });
    fixture = TestBed.createComponent(TrainingsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
