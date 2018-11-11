import { TestBed } from '@angular/core/testing';

import { FlightTicketService } from './flight-ticket.service';

describe('FlightTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightTicketService = TestBed.get(FlightTicketService);
    expect(service).toBeTruthy();
  });
});
