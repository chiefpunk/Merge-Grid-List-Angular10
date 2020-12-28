import { TestBed } from '@angular/core/testing';

import { GridListService } from './grid-list.service';

describe('GridListService', () => {
  let service: GridListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
