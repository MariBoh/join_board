/*import { ApplicationConfig } from '@angular/core';
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



import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase.config';

export const appConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

*/

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ContactService } from './services/contact.service';
import { ContactMockService } from './services/contact.mock.service';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../../src/firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ContactService, useClass: ContactMockService },

    // Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
