import { TestBed } from '@angular/core/testing';

import { HorariosEspService } from './horarios-esp.service';

describe('HorariosEspService', () => {
  let service: HorariosEspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosEspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
