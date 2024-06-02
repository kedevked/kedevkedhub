import { firestoreSchemas } from './firestore-schemas';

describe('firestoreSchemas', () => {
  it('should work', () => {
    expect(firestoreSchemas()).toEqual('firestore-schemas');
  });
});
