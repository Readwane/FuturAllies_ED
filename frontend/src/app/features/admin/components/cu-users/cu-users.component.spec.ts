import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuUsersComponent } from './cu-users.component';

describe('CuUsersComponent', () => {
  let component: CuUsersComponent;
  let fixture: ComponentFixture<CuUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
