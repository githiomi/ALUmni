import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  // Service imports
const _authService : AuthService = inject(AuthService);
const _router : Router = inject(Router);

  if (_authService.isTokenPresent()) {
    return true;
  }else {
    _router.navigateByUrl('/login')
    return true;
  }
};
