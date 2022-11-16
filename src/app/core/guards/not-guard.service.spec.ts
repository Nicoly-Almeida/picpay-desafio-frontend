import { TestBed } from '@angular/core/testing';

import { NotGuardService } from './not-guard.service';

describe('NotGuardService', () => {
  let service: NotGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
