import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunitiesListComponent } from './home-communities-list.component';

describe('HomeCommunitiesListComponent', () => {
  let component: HomeCommunitiesListComponent;
  let fixture: ComponentFixture<HomeCommunitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCommunitiesListComponent]
    });
    fixture = TestBed.createComponent(HomeCommunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
