import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WwedoListComponent } from './wwedo-list.component';

describe('WwedoListComponent', () => {
  let component: WwedoListComponent;
  let fixture: ComponentFixture<WwedoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WwedoListComponent]
    });
    fixture = TestBed.createComponent(WwedoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
