import { TestBed } from '@angular/core/testing';

import { PulsePath } from './pulse-path';

describe('PulsePath', () => {
  let service: PulsePath;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PulsePath);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
