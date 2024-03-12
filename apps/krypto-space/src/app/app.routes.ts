import { Route } from '@angular/router';
import { CoinListComponent } from './features/coins/coin-list/coin-list.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './features/login/login.component';
import { Component, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { NavigationComponent } from './components/navigation/navigation.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { coinsFeature } from './features/coins/+store/coin.reducer';
import { CoinEffects } from './features/coins/+store/coin.effects';
import { CoinResources } from './features/coins/+store/coin.resources';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    children: [
      {
        path: '',
        providers: [
          provideState(coinsFeature),
          provideEffects([CoinEffects]),
          CoinResources,
        ],
        children: [{ path: '', component: CoinListComponent }],
      },
    ],
  },
];
