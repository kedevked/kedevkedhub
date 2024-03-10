import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoinEffects } from './coin.effects';

describe('CoinEffects', () => {
  let actions$: Observable<any>;
  let effects: CoinEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoinEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CoinEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
