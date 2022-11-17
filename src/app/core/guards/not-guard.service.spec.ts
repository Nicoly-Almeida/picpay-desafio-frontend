import { TestBed } from '@angular/core/testing';

import { NotGuardService } from './not-guard.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('NotGuardService', () => {
  let service: NotGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(NotGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
