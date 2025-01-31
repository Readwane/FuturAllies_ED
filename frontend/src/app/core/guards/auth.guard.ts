import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard triggered for URL:', state.url); // Debugging

  return authService.validateToken().pipe(
    map((isValid) => {
      console.log('Token validation result in AuthGuard:', isValid); // Debugging

      if (isValid) {
        return true; // Allow access if the token is valid
      } else {
        console.log('AuthGuard: Token is invalid or expired'); // Debugging
        authService.logout(); // Log out the user if the token is invalid
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Pass the return URL
        return false;
      }
    }),
    catchError((error) => {
      console.error('Error in AuthGuard:', error); // Debugging
      authService.logout(); // Log out the user if there's an error
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Pass the return URL
      return of(false); // Deny access
    })
  );
};