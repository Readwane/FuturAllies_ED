import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUsersComponent } from './c-users.component';

describe('CUsersComponent', () => {
  let component: CUsersComponent;
  let fixture: ComponentFixture<CUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
