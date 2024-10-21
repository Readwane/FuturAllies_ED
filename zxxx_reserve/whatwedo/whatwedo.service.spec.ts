import { TestBed } from '@angular/core/testing';

import { WhatWeDoService } from './whatwedo.service';

describe('ServicesService', () => {
  let service: WhatWeDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatWeDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
