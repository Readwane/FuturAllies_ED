import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  // Méthode pour se connecter et stocker le token dans le localStorage
  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token; // Retourne true si le token est présent, sinon false
  }

  // Méthode pour obtenir le token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
