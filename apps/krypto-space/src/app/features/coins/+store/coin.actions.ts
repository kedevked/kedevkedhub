import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CoinEntity } from "../../../entities/user-entity";

export const CoinActions = createActionGroup({
  source: 'Coin/API',
  events: {
    'Load Coins': emptyProps(),
    'Load Coins success': props<{ coins: CoinEntity[] }>(),
    'Load Coins failure': props<{ error: string}>(),
    'Add Coin': props<{ coin: CoinEntity }>(),
    'Add Coin success': emptyProps(),
    'Add Coin failure': props<{ error: string }>(),
    'Upsert Coin': props<{ coin: CoinEntity }>(),
    'Add Coins': props<{ coins: CoinEntity[] }>(),
    'Upsert Coins': props<{ coins: CoinEntity[] }>(),
    'Update Coin': props<{ coin: Update<CoinEntity> }>(),
    'Update Coins': props<{ coins: Update<CoinEntity>[] }>(),
    'Delete Coin': props<{ id: string }>(),
    'Delete Coin success': props<{ id: string }>(),
    'Delete Coin failure': props<{ error: string }>(),
    'Delete Coins': props<{ ids: string[] }>(),
    'Clear Coins': emptyProps(),

    'login': emptyProps(),
    'login success': emptyProps(),
    'login failure': props<{error: string}>(),
    
  }
});
