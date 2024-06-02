import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CoinEntity, UserEntity } from '../../../models/user';

@Injectable()
export class CoinResourcesMock {
  getCoins() {
    return of([
      { creationDate: new Date(), id: 'id1' },
      { creationDate: new Date(), id: 'id2' },
    ]);
  }

  setCoins(coins: CoinEntity[]) {
    return of(undefined);
  }
}
