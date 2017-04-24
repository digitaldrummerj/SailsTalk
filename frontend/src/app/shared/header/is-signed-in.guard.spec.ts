import { TestBed, async, inject } from '@angular/core/testing';

import { IsSignedInGuard } from './is-signed-in.guard';

describe('IsSignedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSignedInGuard]
    });
  });

  it('should ...', inject([IsSignedInGuard], (guard: IsSignedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
