import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferApplicationListComponent } from './offer-application-list.component';

describe('OfferApplicationListComponent', () => {
  let component: OfferApplicationListComponent;
  let fixture: ComponentFixture<OfferApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferApplicationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
