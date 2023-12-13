import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  // Dependency Injection
  private _authService : AuthService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let interceptedRequest = request.clone({
      setHeaders : {
        Authorization: this._authService.getAccessToken()
      }
    })

    return next.handle(interceptedRequest);
  }
}
