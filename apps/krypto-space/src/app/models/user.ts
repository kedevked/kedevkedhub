import { Timestamp } from "@angular/fire/firestore";




export interface User {
  coins?: Coin[];
}

export interface Coin {
  id: string
  creationDate?: Timestamp
}

export interface UserEntity {
  coins: CoinEntity[]
}

export interface CoinEntity {
  id: string;
  creationDate: Date | null
}