import { TestBed } from '@angular/core/testing';

import { SendTableFilesService } from './send-table-files.service';

describe('SendTableFilesService', () => {
  let service: SendTableFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendTableFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
