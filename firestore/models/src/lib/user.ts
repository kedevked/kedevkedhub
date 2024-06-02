import { Timestamp } from "@angular/fire/firestore";




export interface User {
  coins?: Coin[];
}

export interface Coin {
  id: string
  creationDate?: Timestamp
}

