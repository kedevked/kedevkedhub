import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Auth } from '@angular/fire/auth';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserQueries } from '../../../queries/users.queries';
import { catchSwitchMapError } from '../../../shared/rxjs-operators';
import { CoinActions } from './coin.actions';
import { selectAll } from './coin.reducer';
import { CoinResources } from './coin.resources';

@Injectable()
export class CoinEffects {
  userQueries = inject(UserQueries);
  auth = inject(Auth);
  store = inject(Store);
  coinResources = inject(CoinResources);
  loadCoins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoinActions.loadCoins),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      switchMap(() => {
        return this.coinResources.getCoins();
      }),
      map((coins) => CoinActions.loadCoinsSuccess({ coins })),
      catchSwitchMapError((error: Error) =>
        CoinActions.loadCoinsFailure({ error: error.message })
      )
    );
  });

  addCoin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoinActions.addCoin),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([ ,coins]) => {
        return this.coinResources
          .setCoins([...coins])
          .pipe(map(() => CoinActions.addCoinSuccess()));
      }),
      catchSwitchMapError((error: Error) =>
        CoinActions.addCoinFailure({ error: error.message })
      )
    );
  });

  deleteCoin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoinActions.deleteCoin),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([{ id }, coins]) => {
        return this.coinResources
          .setCoins(coins.filter((coin) => coin.id !== id))
          .pipe(map(() => CoinActions.deleteCoinSuccess({ id })));
      }),
      catchSwitchMapError((error: Error) =>
        CoinActions.deleteCoinFailure({ error: error.message })
      )
    );
  });

  constructor(private actions$: Actions) {}
}
