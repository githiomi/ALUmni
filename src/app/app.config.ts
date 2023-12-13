import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// Lottie Module Imports
import { LottieModule } from 'ngx-lottie';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { GlobalInterceptor } from './interceptors/global.interceptor';

// Lottie Animation
export function playerFactory(): any {
  return import('lottie-web');
}

// npm install lottie-web ngx-lottie

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimations(),
  provideAnimations(),
  importProvidersFrom(
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LottieModule.forRoot(
      { player: playerFactory }
    )
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalInterceptor,
    multi: true
  }
  ]
};
