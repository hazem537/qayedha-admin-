import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authIntreceprtorService } from './auth/aut-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass:authIntreceprtorService, multi: true },
    importProvidersFrom(HttpClientModule),
  ]
};
