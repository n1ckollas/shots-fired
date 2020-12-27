import { TestBed } from '@angular/core/testing';

import { DetailChartService } from './detail-chart.service';

describe('DetailChartService', () => {
  let service: DetailChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
