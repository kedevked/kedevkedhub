import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { skip, take } from 'rxjs';
import { UserQueries } from '../../queries/users.queries';

export interface Coin {
  name: string;
}

@Component({
  selector: 'kedevkedhub-coin-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  coins = signal<Coin[]>([]);
  coins$ = toObservable(this.coins);
  form = new FormGroup({
    coin: new FormControl('', { nonNullable: true }),
  });
  userQueries = inject(UserQueries);
  auth = inject(Auth);

  deleteCoin(indexToRemove: number) {
    this.coins.update((coins) => {
      return coins.filter((_, i) => i !== indexToRemove);
    });
  }
  addCoin(name: string) {
    this.coins.update((coins) => [...coins, { name }]);
    this.form.controls.coin.reset();
  }

  ngOnInit(): void {
    this.userQueries
      .getUser(this.auth.currentUser?.uid as string)
      .pipe(take(1))
      .subscribe((user) => this.coins.set(user.coins ?? []));

    this.coins$.pipe(skip(1)).subscribe((coins) =>
      this.userQueries.upsertCoins(
        this.auth.currentUser?.uid as string,
        this.coins()
      )
    );
  }
}
