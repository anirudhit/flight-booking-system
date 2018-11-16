import { TestBed } from '@angular/core/testing';

import { FlightHistoryService } from './flight-history.service';

describe('FlightHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightHistoryService = TestBed.get(FlightHistoryService);
    expect(service).toBeTruthy();
  });
});
