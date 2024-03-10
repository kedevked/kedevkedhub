import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Auth } from '@angular/fire/auth';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserQueries } from '../../../queries/users.queries';
import { catchSwitchMapError } from '../../../shared/rxjs-operators';
import { CoinActions } from './coin.actions';
import { selectAll } from './coin.reducer';

@Injectable()
export class CoinEffects {
  userQueries = inject(UserQueries);
  auth = inject(Auth);
  store = inject(Store);
  loadCoins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoinActions.loadCoins),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      switchMap(() =>
        this.userQueries
          .getUser(this.auth.currentUser?.uid as string)
          .pipe(take(1))
      ),
      map((user) => CoinActions.loadCoinsSuccess({ coins: user.coins ?? [] })),
      catchSwitchMapError((error: Error) =>
        CoinActions.loadCoinsFailure({ error: error.message })
      )
    );
  });

  addCoin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoinActions.addCoin),
      concatLatestFrom(() => this.store.select(selectAll)),
      switchMap(([{ coin }, coins]) => {
        return from(
          this.userQueries.upsertCoins(this.auth.currentUser?.uid as string, [
            ...coins,
            coin,
          ])
        ).pipe(map(() => CoinActions.addCoinSuccess({ coin })));
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
        return from(
          this.userQueries.upsertCoins(
            this.auth.currentUser?.uid as string,
            coins.filter((coin) => coin.id !== id)
          )
        ).pipe(map(() => CoinActions.deleteCoinSuccess({ id })));
      }),
      catchSwitchMapError((error: Error) =>
        CoinActions.deleteCoinFailure({ error: error.message })
      )
    );
  });

  constructor(private actions$: Actions) {}
}
