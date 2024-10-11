import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterServicesComponent } from './footer-services.component';

describe('FooterServicesComponent', () => {
  let component: FooterServicesComponent;
  let fixture: ComponentFixture<FooterServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterServicesComponent]
    });
    fixture = TestBed.createComponent(FooterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
