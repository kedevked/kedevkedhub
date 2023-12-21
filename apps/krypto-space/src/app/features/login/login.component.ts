import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'kedevkedhub-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth = getAuth();
  provider = new GoogleAuthProvider();
  signIn() {
    signInWithPopup(this.auth, this.provider).then((credential) => {
      console.log('you are logged in', credential);
    });
  }
}
