import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CoinActions } from './coin.actions';
import { CoinEntity } from '../../../models/user';

export const coinsFeatureKey = 'coins';

export interface State extends EntityState<CoinEntity> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CoinEntity> = createEntityAdapter<CoinEntity>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CoinActions.addCoin,
    (state, action) => adapter.addOne(action.coin, state)
  ),
  on(CoinActions.upsertCoin,
    (state, action) => adapter.upsertOne(action.coin, state)
  ),
  on(CoinActions.addCoins,
    (state, action) => adapter.addMany(action.coins, state)
  ),
  on(CoinActions.upsertCoins,
    (state, action) => adapter.upsertMany(action.coins, state)
  ),
  on(CoinActions.updateCoin,
    (state, action) => adapter.updateOne(action.coin, state)
  ),
  on(CoinActions.updateCoins,
    (state, action) => adapter.updateMany(action.coins, state)
  ),
  on(CoinActions.deleteCoin,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CoinActions.deleteCoins,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CoinActions.loadCoinsSuccess,
    (state, action) => adapter.setAll(action.coins, state)
  ),
  on(CoinActions.clearCoins,
    state => adapter.removeAll(state)
  ),
);

export const coinsFeature = createFeature({
  name: coinsFeatureKey,
  reducer,
  extraSelectors: ({ selectCoinsState }) => ({
    ...adapter.getSelectors(selectCoinsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = coinsFeature;
