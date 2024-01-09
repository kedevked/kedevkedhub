import { Route } from '@angular/router';
import { CoinListComponent } from './features/coin-list/coin-list.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './features/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { NavigationComponent } from './components/navigation/navigation.component';
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
        component: CoinListComponent,
        path: '',
      },
    ],
  },
];
