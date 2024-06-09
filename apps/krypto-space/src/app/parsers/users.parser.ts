import { Timestamp } from '@angular/fire/firestore';
import { CoinEntity, UserEntity } from "../entities/user-entity";
import { Coin, User } from '@kedevkedhub/firestore/models';

export function toUserEntity(data: User): UserEntity {
  return {
    coins:
      data.coins?.map((coin) => ({
        id: coin.id,
        creationDate: coin.creationDate?.toDate() ?? null,
      })) ?? [],
  };
}

export function toUser(data: UserEntity): User {
  return {
    ...(data.coins.length && {
      coins: toCoins(data.coins),
    }),
  };
}
export function toCoins(coins: CoinEntity[]): Coin[]  {
  return coins.map((coin) => ({
    id: coin.id,
    ...(coin.creationDate && {
      creationDate: Timestamp.fromDate(coin.creationDate),
    }),
  }));
}
