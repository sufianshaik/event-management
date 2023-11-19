import { TestBed } from '@angular/core/testing';

import { EventsDetailsService } from './events-details.service';

describe('EventsDetailsService', () => {
  let service: EventsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
