import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinnairesComponent } from './Webinnaires.component';

describe('CafesDesAlliesComponent', () => {
  let component: WebinnairesComponent;
  let fixture: ComponentFixture<WebinnairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebinnairesComponent]
    });
    fixture = TestBed.createComponent(WebinnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
