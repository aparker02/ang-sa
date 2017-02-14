/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceDataService } from './device-data.service';

describe('DeviceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDataService]
    });
  });

  it('should ...', inject([DeviceDataService], (service: DeviceDataService) => {
    expect(service).toBeTruthy();
  }));
});
