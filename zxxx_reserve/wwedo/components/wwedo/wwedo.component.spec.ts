import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WwedoComponent } from './wwedo.component';

describe('WwedoComponent', () => {
  let component: WwedoComponent;
  let fixture: ComponentFixture<WwedoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WwedoComponent]
    });
    fixture = TestBed.createComponent(WwedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
