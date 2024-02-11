import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'kedevkedhub-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth = inject(Auth);
  router = inject(Router)
  async signIn() {
    await signInWithPopup(this.auth, new GoogleAuthProvider()).then((credential) => {
      console.log('you are logged in', credential);
    });
    this.router.navigate(['/'])
  }
}
