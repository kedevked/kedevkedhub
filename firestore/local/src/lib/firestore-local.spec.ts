import { firestoreLocal } from './firestore-local';

describe('firestoreLocal', () => {
  it('should work', () => {
    expect(firestoreLocal()).toEqual('firestore-local');
  });
});
