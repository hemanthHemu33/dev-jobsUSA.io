import { TestBed } from '@angular/core/testing';

import { JobsSserviceService } from './jobs-sservice.service';

describe('JobsSserviceService', () => {
  let service: JobsSserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsSserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
