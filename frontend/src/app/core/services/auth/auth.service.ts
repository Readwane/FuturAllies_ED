import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/fapi'; 
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Initialisation de l'état de connexion au démarrage (pour vérifier si le token existe déjà)
    if (localStorage.getItem('token')) {
      this.loggedInStatus.next(true);
    }
  }

  // Getter pour accéder à l'état de la connexion
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  // Méthode pour se connecter
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError(error => {
          console.error('Erreur de login:', error);
          throw error;  // Relance l'erreur pour gestion ultérieure dans le composant
        })
      );
  }

  // Après le login, sauvegarder le token dans localStorage
  loginSuccess(token: string): void {
    localStorage.setItem('token', token);  // Sauvegarde du token
    this.loggedInStatus.next(true); // Mettez à jour l'état de la connexion
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('token');  // Supprimer le token du localStorage
    this.loggedInStatus.next(false);  // Mettre à jour l'état de la connexion
    this.router.navigate(['/login']);  // Rediriger vers la page de login
  }
}
