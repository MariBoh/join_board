import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ContactService } from './services/contact.service';
import { ContactMockService } from './services/contact.mock.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import {webAppConfig} from '../firebase.config'
import { FirebaseService } from './services/firebase.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ContactService, useClass: FirebaseService },
    provideFirebaseApp(() =>
      initializeApp(webAppConfig)
    ),
    provideFirestore(() => getFirestore()),
  ],
};
