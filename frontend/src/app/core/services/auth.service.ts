import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.models';

interface LoginResponse {
  token: string;
  foundUser: User;
  userGroups: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/fapi';  // L'URL de base de l'API
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  private connectedUser: User | null = null;
  private userGroups: string[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router) 
  {
    // Vérification de l'existence du token dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInStatus.next(true);  // L'utilisateur est connecté si un token est présent
    }
  }

  // Retourne l'utilisateur connecté
  getUser(): User | null {
    return this.connectedUser;
  }

  // Retourne les groupes de l'utilisateur
  getUserGroups(): string[] {
    return this.userGroups;
  }

  // Observable pour suivre l'état de la connexion
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  // Méthode de connexion avec mise à jour de l'état
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          // Sauvegarde du token dans le localStorage
          localStorage.setItem('token', response.token);
          this.loggedInStatus.next(true);  // Utilisateur connecté
        }
        // Sauvegarde de l'utilisateur et de ses groupes
        this.connectedUser = response.foundUser;
        this.userGroups = response.userGroups;
      }),
      catchError(error => {
        console.error('Erreur de login:', error);
        throw error;
      })
    );
  }

  // Méthode de déconnexion
  logout(): void {
    // Suppression du token dans le localStorage
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);  // Mise à jour de l'état de la connexion
    this.connectedUser = null;  // Réinitialisation de l'utilisateur
    this.userGroups = [];  // Réinitialisation des groupes
  }
}
