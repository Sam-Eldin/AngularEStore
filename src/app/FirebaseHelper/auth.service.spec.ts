import { TestBed } from '@angular/core/testing';

import { FirebaseHelper } from './firebase-helper.service';

describe('AuthService', () => {
  let service: FirebaseHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
