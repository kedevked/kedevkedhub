import { Route } from '@angular/router';
import { CoinListComponent } from './features/coin-list/coin-list.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './features/login/login.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
  {
    path: '',
    component: CoinListComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   authGuardPipe: redirectUnauthorizedToLogin,
    // },
  },
];
