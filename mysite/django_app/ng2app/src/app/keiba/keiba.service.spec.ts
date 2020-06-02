import { TestBed } from '@angular/core/testing';

import { KeibaService } from './keiba.service';

describe('KeibaService', () => {
  let service: KeibaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeibaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
