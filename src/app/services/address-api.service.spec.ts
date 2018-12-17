import { TestBed } from '@angular/core/testing';

import { AddressApiService } from './address-api.service';

describe('AddressApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressApiService = TestBed.get(AddressApiService);
    expect(service).toBeTruthy();
  });
});
