import { Route } from '@angular/router';
import { CoinListComponent } from './features/coin-list/coin-list.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './features/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp, } from '@angular/fire/app';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: CoinListComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
