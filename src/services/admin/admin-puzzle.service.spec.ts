import { TestBed } from '@angular/core/testing';

import { AdminPuzzleService } from './admin-puzzle.service';

describe('AdminPuzzleService', () => {
  let service: AdminPuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
