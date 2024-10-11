import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocialMediasComponent } from './footer-social-medias.component';

describe('FooterSocialMediasComponent', () => {
  let component: FooterSocialMediasComponent;
  let fixture: ComponentFixture<FooterSocialMediasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterSocialMediasComponent]
    });
    fixture = TestBed.createComponent(FooterSocialMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
