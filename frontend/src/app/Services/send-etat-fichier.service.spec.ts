import { TestBed } from '@angular/core/testing';

import { SendEtatFichierService } from './send-etat-fichier.service';

describe('SendEtatFichierService', () => {
  let service: SendEtatFichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEtatFichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
