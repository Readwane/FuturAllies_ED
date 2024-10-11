import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAproposComponent } from './footer-apropos.component';

describe('FooterAproposComponent', () => {
  let component: FooterAproposComponent;
  let fixture: ComponentFixture<FooterAproposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterAproposComponent]
    });
    fixture = TestBed.createComponent(FooterAproposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
