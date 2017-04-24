import { TestBed, async, inject } from '@angular/core/testing';

import { IsLoggedOutGuard } from './is-logged-out.guard';

describe('IsLoggedOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedOutGuard]
    });
  });

  it('should ...', inject([IsLoggedOutGuard], (guard: IsLoggedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
