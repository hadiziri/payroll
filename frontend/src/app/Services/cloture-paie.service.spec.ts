import { TestBed } from '@angular/core/testing';

import { CloturePaieService } from './cloture-paie.service';

describe('CloturePaieService', () => {
  let service: CloturePaieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloturePaieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
