import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CanActivateFn } from '@angular/router';
import { first, map, Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier l'état de connexion de manière asynchrone
  return authService.isLoggedIn$.pipe(
    first(), // Émet la première valeur et termine l'Observable
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
  
};
