import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { CanActivateFn } from '@angular/router';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  // Vérifier l'état de connexion directement de manière synchrone
  if (authService.isLoggedIn) {
    return true;  // L'utilisateur est connecté
  } else {
    router.navigate(['/a-login']);  // Rediriger vers la page de login
    return false;  // L'utilisateur n'est pas autorisé
  }
};
