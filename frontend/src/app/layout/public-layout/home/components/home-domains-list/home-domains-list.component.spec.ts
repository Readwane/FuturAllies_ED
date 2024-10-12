import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDomainsListComponent } from './home-domains-list.component';

describe('HomeDomainsListComponent', () => {
  let component: HomeDomainsListComponent;
  let fixture: ComponentFixture<HomeDomainsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDomainsListComponent]
    });
    fixture = TestBed.createComponent(HomeDomainsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
