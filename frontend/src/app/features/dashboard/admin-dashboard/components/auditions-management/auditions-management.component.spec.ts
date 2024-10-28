import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditionsManagementComponent } from './auditions-management.component';

describe('AuditionsManagementComponent', () => {
  let component: AuditionsManagementComponent;
  let fixture: ComponentFixture<AuditionsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditionsManagementComponent]
    });
    fixture = TestBed.createComponent(AuditionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
