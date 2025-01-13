import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEmpActivitiesComponent } from './last-emp-activities.component';

describe('LastEmpActivitiesComponent', () => {
  let component: LastEmpActivitiesComponent;
  let fixture: ComponentFixture<LastEmpActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastEmpActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastEmpActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
