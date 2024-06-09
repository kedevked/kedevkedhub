import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { authClaims, authUsers } from './data/auth-users';
import { users } from './data/users';

export interface Fixture<T = unknown> {
  [path: string]: T;
}
export async function firestoreLocal() {
  const auth = getAuth();
  auth.importUsers(authUsers);
  await Promise.all(
    Object.entries(authClaims).map(([uid, claims]) =>
      auth.setCustomUserClaims(uid, claims)
    )
  );

  await loadData(users);
}

export async function loadData<T>(data: Fixture<T>) {
  const db = getFirestore();
  // const writer = db.batch();
  for (const [path, fixture] of Object.entries(data)) {
    await db.doc(path).set(fixture as any);
    // writer.set(db.doc(path), fixture as unknown);
  }
  // await writer.commit();
}


