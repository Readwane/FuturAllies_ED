import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderNavigationComponent } from './main-header-navigation.component';

describe('MainHeaderNavigationComponent', () => {
  let component: MainHeaderNavigationComponent;
  let fixture: ComponentFixture<MainHeaderNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainHeaderNavigationComponent]
    });
    fixture = TestBed.createComponent(MainHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
