import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLinkComponent } from './simple-link.component';

describe('SimpleLinkComponent', () => {
  let component: SimpleLinkComponent;
  let fixture: ComponentFixture<SimpleLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLinkComponent]
    });
    fixture = TestBed.createComponent(SimpleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
