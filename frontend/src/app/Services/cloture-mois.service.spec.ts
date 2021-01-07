import { TestBed } from '@angular/core/testing';

import { ClotureMoisService } from './cloture-mois.service';

describe('ClotureMoisService', () => {
  let service: ClotureMoisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClotureMoisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
