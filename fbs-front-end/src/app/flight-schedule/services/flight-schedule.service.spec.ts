import { TestBed } from '@angular/core/testing';

import { FlightScheduleService } from './flight-schedule.service';

describe('FlightScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightScheduleService = TestBed.get(FlightScheduleService);
    expect(service).toBeTruthy();
  });
});
