import { UserImportRecord } from 'firebase-admin/auth';

export const authUsers = [
  {
    uid: 'user1',
    email: 'user1@fake.com',
    providerData: [
      {
        uid: 'user1',
        displayName: 'user1',
        providerId: 'google.com',
      },
    ],
  },
] as UserImportRecord[];
export const authClaims = { user1: { claim1: true } };
