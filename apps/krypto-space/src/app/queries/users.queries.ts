import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Coin, User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class UserQueries {
  firestore = inject(Firestore);

  upsertCoins(userId: string, coins: Coin[]) {
    return setDoc(
      doc(this.firestore, `users/${userId}`),
      { coins },
      { merge: true }
    );
  }

  getUser(userId: string) {
    return docData(doc(this.firestore, `users/${userId}`)) as Observable<User>;
  }
}
