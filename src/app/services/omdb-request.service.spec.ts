import { TestBed } from '@angular/core/testing';

import { OmdbRequestService } from './omdb-request.service';

describe('OmdbRequestService', () => {
  let service: OmdbRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdbRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
