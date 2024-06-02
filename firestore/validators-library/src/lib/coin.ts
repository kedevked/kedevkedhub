import { Coin } from '@kedevkedhub/firestore/models';
import { CustomError } from '@kedevkedhub/utils/errors';
import { isCoinValid } from './ajv-validators/user';

export function validCoin(data: Coin) {
  if (!isCoinValid(data)) {
    throw new CustomError('Coin is invalid');
  }
}
