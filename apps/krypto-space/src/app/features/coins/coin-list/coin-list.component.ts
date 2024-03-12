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
import { UserQueries } from '../../../queries/users.queries';
import { Store } from '@ngrx/store';
import { CoinActions } from '../+store/coin.actions';
import { selectAll } from '../+store/coin.reducer';


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
  // coins$ = toObservable(this.coins);
  form = new FormGroup({
    coin: new FormControl('', { nonNullable: true }),
  });
  userQueries = inject(UserQueries);
  auth = inject(Auth);
  store = inject(Store);
  coins = this.store.selectSignal(selectAll);

  deleteCoin(id: string) {
    this.store.dispatch(CoinActions.deleteCoin({id}))
  }
  addCoin(name: string) {
    this.store.dispatch(CoinActions.addCoin({ coin: { id: name, creationDate: new Date() } }));
  }

  ngOnInit(): void {
    this.store.dispatch(CoinActions.loadCoins());
  }
}
