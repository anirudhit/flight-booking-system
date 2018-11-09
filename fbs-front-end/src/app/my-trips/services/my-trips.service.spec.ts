import { TestBed } from '@angular/core/testing';

import { MyTripsService } from './my-trips.service';

describe('MyTripsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTripsService = TestBed.get(MyTripsService);
    expect(service).toBeTruthy();
  });
});
