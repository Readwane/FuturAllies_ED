import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunityListComponent } from './home-community-list.component';

describe('HomeCommunityListComponent', () => {
  let component: HomeCommunityListComponent;
  let fixture: ComponentFixture<HomeCommunityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCommunityListComponent]
    });
    fixture = TestBed.createComponent(HomeCommunityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
