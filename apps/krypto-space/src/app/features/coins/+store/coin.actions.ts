import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Coin } from './coin.model';

export const CoinActions = createActionGroup({
  source: 'Coin/API',
  events: {
    'Load Coins': emptyProps(),
    'Load Coins success': props<{ coins: Coin[] }>(),
    'Load Coins failure': props<{ error: string}>(),
    'Add Coin': props<{ coin: Coin }>(),
    'Add Coin success': props<{ coin: Coin }>(),
    'Add Coin failure': props<{ error: string }>(),
    'Upsert Coin': props<{ coin: Coin }>(),
    'Add Coins': props<{ coins: Coin[] }>(),
    'Upsert Coins': props<{ coins: Coin[] }>(),
    'Update Coin': props<{ coin: Update<Coin> }>(),
    'Update Coins': props<{ coins: Update<Coin>[] }>(),
    'Delete Coin': props<{ id: string }>(),
    'Delete Coin success': props<{ id: string }>(),
    'Delete Coin failure': props<{ error: string }>(),
    'Delete Coins': props<{ ids: string[] }>(),
    'Clear Coins': emptyProps(),
  }
});
