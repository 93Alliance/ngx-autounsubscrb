import { TestBed } from '@angular/core/testing';

import { TestProvService } from './test-prov.service';

describe('TestProvService', () => {
  let service: TestProvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestProvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
