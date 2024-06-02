import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoinActions } from '../coins/+store/coin.actions';

@Component({
  selector: 'kedevkedhub-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth = inject(Auth);
  router = inject(Router);
  store = inject(Store);
  async signIn() {
    this.store.dispatch(CoinActions.login());
  }
}
