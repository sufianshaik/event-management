import { TestBed } from '@angular/core/testing';

import { UserLoginDetailsService } from './user-login-details.service';

describe('UserLoginDetailsService', () => {
  let service: UserLoginDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
