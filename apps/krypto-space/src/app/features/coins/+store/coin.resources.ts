import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Observable, from, map, take } from 'rxjs';
import { CoinEntity } from "../../../entities/user-entity";
import { toCoins, toUserEntity } from '../../../parsers/users.parser';
import { UserQueries } from '../../../queries/users.queries';
import { validUser } from '@kedevkedhub/firestore/validators-library';

@Injectable()
export abstract class CoinResourcesAbstract {
  abstract getCoins(): Observable<CoinEntity[]>;
  abstract setCoins(coins: CoinEntity[]): Observable<void>;
  abstract login(): Observable<void>;
}

@Injectable()
export class CoinResources {
  private readonly userQueries = inject(UserQueries);
  private readonly auth = inject(Auth);

  getCoins() {
    return this.userQueries.getUser(this.auth.currentUser?.uid as string).pipe(
      take(1),
      map((user) => {
        validUser(user);
        return toUserEntity(user).coins;
      })
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

  login() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }
}
