import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWwdosListComponent } from './home-wwdos-list.component';

describe('HomeWwdosListComponent', () => {
  let component: HomeWwdosListComponent;
  let fixture: ComponentFixture<HomeWwdosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWwdosListComponent]
    });
    fixture = TestBed.createComponent(HomeWwdosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
