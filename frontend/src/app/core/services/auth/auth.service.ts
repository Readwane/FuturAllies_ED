import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/fapi'; 
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private currentUserName: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    // Initialisation de l'état de connexion au démarrage
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInStatus.next(true);
    }
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  getUserName(): string | null {
    return this.currentUserName;  // Retourne le nom de l'utilisateur connecté
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        // Assurez-vous d'affecter correctement le nom de l'utilisateur après une connexion réussie
        catchError(error => {
          console.error('Erreur de login:', error);
          throw error;
        })
      ).pipe(
        tap(response => {
          this.currentUserName = username;  // Affecter le nom d'utilisateur après une connexion réussie
          this.loggedInStatus.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedInStatus.next(false);
  }
}
