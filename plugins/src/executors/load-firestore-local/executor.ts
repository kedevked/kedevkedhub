import { firestoreLocal } from '@kedevkedhub/firestore/local';
import { LoadFirestoreLocalExecutorSchema } from './schema';
import { initializeApp } from 'firebase-admin/app';

export default async function runExecutor(
  options: LoadFirestoreLocalExecutorSchema
) {
  initializeApp({projectId: 'fakeproject'})
  await firestoreLocal();
  return {
    success: true,
  };
}
