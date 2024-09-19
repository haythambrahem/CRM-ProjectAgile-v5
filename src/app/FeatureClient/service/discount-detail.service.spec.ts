import { TestBed } from '@angular/core/testing';

import { DiscountDetailService } from './discount-detail.service';

describe('DiscountDetailService', () => {
  let service: DiscountDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
