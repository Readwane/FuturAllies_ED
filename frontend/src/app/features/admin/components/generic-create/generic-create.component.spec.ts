import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCreateComponent } from './generic-create.component';

describe('GenericCreateComponent', () => {
  let component: GenericCreateComponent;
  let fixture: ComponentFixture<GenericCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});