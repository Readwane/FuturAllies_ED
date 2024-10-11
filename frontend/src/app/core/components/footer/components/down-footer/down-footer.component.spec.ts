import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownFooterComponent } from './down-footer.component';

describe('DownFooterComponent', () => {
  let component: DownFooterComponent;
  let fixture: ComponentFixture<DownFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownFooterComponent]
    });
    fixture = TestBed.createComponent(DownFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
