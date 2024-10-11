import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BountonComponent } from './bounton.component';

describe('BountonComponent', () => {
  let component: BountonComponent;
  let fixture: ComponentFixture<BountonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BountonComponent]
    });
    fixture = TestBed.createComponent(BountonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
