import { User } from '@kedevkedhub/firestore/models';
import { CustomError } from '@kedevkedhub/utils/errors';
import { isUserValid } from './ajv-validators/user';

export function validUser(data: User) {
  if (!isUserValid(data)) {
    throw new CustomError('User is invalid');
  }
}
