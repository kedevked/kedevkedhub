import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { firestoreProvider } from './shared/firestore.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    // firestoreProvider(),
  ],
};
