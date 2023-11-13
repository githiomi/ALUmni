import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient} from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// Lottie Module Imports
import { LottieModule } from 'ngx-lottie';

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
                LottieModule.forRoot(
                  {player : playerFactory}
                )
              )
            ]
};
