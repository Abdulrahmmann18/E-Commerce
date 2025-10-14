import { TestBed } from '@angular/core/testing';

import { NavlinksService } from './navlinks.service';

describe('NavlinksService', () => {
  let service: NavlinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavlinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
