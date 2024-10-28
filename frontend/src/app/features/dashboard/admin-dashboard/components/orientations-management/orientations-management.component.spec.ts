import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationsManagementComponent } from './orientations-management.component';

describe('OrientationsManagementComponent', () => {
  let component: OrientationsManagementComponent;
  let fixture: ComponentFixture<OrientationsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrientationsManagementComponent]
    });
    fixture = TestBed.createComponent(OrientationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
