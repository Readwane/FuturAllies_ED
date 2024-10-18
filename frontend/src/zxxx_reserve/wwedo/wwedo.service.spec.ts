import { TestBed } from '@angular/core/testing';

import { WwedoService } from './wwedo.service';

describe('WwedoService', () => {
  let service: WwedoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WwedoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
