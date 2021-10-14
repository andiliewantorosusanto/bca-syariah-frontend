import { TestBed } from '@angular/core/testing';

import { TextfileService } from './textfile.service';

describe('TextfileService', () => {
  let service: TextfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
