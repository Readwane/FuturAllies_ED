import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeValuesListComponent } from './home-values-list.component';

describe('HomeValuesListComponent', () => {
  let component: HomeValuesListComponent;
  let fixture: ComponentFixture<HomeValuesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeValuesListComponent]
    });
    fixture = TestBed.createComponent(HomeValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
