import { TestBed } from '@angular/core/testing';

import { TrainingModuleService } from './training-module.service';

describe('TrainingModuleService', () => {
  let service: TrainingModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
