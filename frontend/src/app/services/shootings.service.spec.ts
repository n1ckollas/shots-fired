import { TestBed } from '@angular/core/testing';

import { ShootingsService } from './shootings.service';

describe('ShootingsService', () => {
  let service: ShootingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShootingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
