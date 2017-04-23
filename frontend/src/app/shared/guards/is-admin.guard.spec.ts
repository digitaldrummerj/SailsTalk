import { TestBed, async, inject } from '@angular/core/testing';

import { IsAdminGuard } from './is-admin.guard';

describe('IsAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAdminGuard]
    });
  });

  it('should ...', inject([IsAdminGuard], (guard: IsAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
