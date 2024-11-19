import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuResourceComponent } from './cu-resource.component';

describe('CuResourceComponent', () => {
  let component: CuResourceComponent;
  let fixture: ComponentFixture<CuResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuResourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
