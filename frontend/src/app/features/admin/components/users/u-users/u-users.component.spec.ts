import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UUsersComponent } from './u-users.component';

describe('UUsersComponent', () => {
  let component: UUsersComponent;
  let fixture: ComponentFixture<UUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
