import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from, map, take } from 'rxjs';
import { CoinEntity } from '../../../models/user';
import { toCoins, toUserEntity } from '../../../parsers/users.parser';
import { UserQueries } from '../../../queries/users.queries';

@Injectable()
export class CoinResources {
  private readonly userQueries = inject(UserQueries);
  private readonly auth = inject(Auth);

  getCoins() {
    return this.userQueries.getUser(this.auth.currentUser?.uid as string).pipe(
      take(1),
      map((user) => toUserEntity(user).coins)
    );
  }

  setCoins(coins: CoinEntity[]) {
    return from(
      this.userQueries.upsertCoins(
        this.auth.currentUser?.uid as string,
        toCoins(coins)
      )
    );
  }
}
