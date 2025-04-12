import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ContactService } from './services/contact.service';
import { ContactMockService } from './services/contact.mock.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  { provide: ContactService, useClass: ContactMockService }
  ]
};
