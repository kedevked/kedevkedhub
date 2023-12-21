import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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
export class CoinListComponent {
  coins = signal<Coin[]>([]);
  form = new FormGroup({
    coin: new FormControl('', { nonNullable: true }),
  });

  deleteCoin(index: number) {
    this.coins.update((coins) => {
      coins.splice(index, 1);
      return coins;
    });
  }
  addCoin(name: string) {
    this.coins.update((coins) => [...coins, { name }]);
    this.form.controls.coin.reset();
  }
}
