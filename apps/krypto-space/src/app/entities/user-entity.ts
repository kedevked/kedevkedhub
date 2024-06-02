
export interface UserEntity {
  coins: CoinEntity[];
}

export interface CoinEntity {
  id: string;
  creationDate: Date | null;
}
