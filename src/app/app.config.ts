import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient} from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// Lottie Module Imports
import { LottieModule } from 'ngx-lottie';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
                  {player : playerFactory}
                )
              )
            ]
};
