import { TestBed } from '@angular/core/testing';

import { TrainingApplicationService } from './training-application.service';

describe('TrainingApplicationService', () => {
  let service: TrainingApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
