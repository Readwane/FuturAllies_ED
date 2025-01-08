import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier l'état de connexion de manière asynchrone
  return authService.isLoggedIn$.toPromise().then((isLoggedIn) => {
    if (isLoggedIn) {
      return true;  // L'utilisateur est connecté
    } else {
      router.navigate(['/login']);  // Rediriger vers la page de login
      return false;  // L'utilisateur n'est pas autorisé
    }
  });
};
