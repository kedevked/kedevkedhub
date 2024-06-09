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
import {
  CoinResources,
  CoinResourcesAbstract,
} from './features/coins/+store/coin.resources';
import { environment } from '../environments/environment';
import { CoinResourcesMock } from './features/coins/+store/coin.resources.mock';
import { of } from 'rxjs';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(coinsFeature),
      provideEffects([CoinEffects]),
      {
        provide: CoinResourcesAbstract,
        useClass: environment.mock ? CoinResourcesMock : CoinResources,
      },
    ],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        component: NavigationComponent,
        canActivate: [environment.mock ? () => of(true) : AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
        children: [
          {
            path: '',
            children: [{ path: '', component: CoinListComponent }],
          },
        ],
      },
    ],
  },
];
