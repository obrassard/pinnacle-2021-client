import { TestBed } from '@angular/core/testing';

import { UPCapiService } from './upcapi.service';

describe('UPCapiService', () => {
  let service: UPCapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UPCapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
