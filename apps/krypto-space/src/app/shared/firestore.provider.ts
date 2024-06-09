import { importProvidersFrom } from '@angular/core';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  Firestore,
  initializeFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';

export function firestoreProvider() {
  return [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      // provideAnalytics(() => getAnalytics()),
      // provideAuth(() => getAuth()),
      provideFirestore(() => {
        let firestore: Firestore;
        if (environment.firestoreLocal) {
          firestore = initializeFirestore(getApp(), {
            experimentalForceLongPolling: true,
          });
          connectFirestoreEmulator(firestore, 'localhost', 8080);
        } else {
          firestore = getFirestore();
        }
        return getFirestore();
      }),
      // provideFunctions(() => getFunctions()),
      // provideMessaging(() => getMessaging()),
      // providePerformance(() => getPerformance()),
      // provideRemoteConfig(() => getRemoteConfig()),
      // provideStorage(() => getStorage())
      provideAuth(() => {
        const auth = getAuth(getApp());
        if (environment.firestoreLocal) {
          connectAuthEmulator(auth, 'http://localhost:9099');
        }
        return auth;
      })
    ),
    // importProvidersFrom(provideAuth(() => getAuth(getApp()))),
  ];
}
