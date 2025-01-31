import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  private apiUrl = 'http://localhost:3000/fapi';
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private connectedUser: User | null = null;
  private userGroups: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInStatus.next(true);
      this.connectedUser = JSON.parse(localStorage.getItem('user') || 'null');
      this.userGroups = JSON.parse(localStorage.getItem('userGroups') || '[]');
    }
  }

  getUser(): User | null {
    return this.connectedUser;
  }

  getUserGroups(): string[] {
    return this.userGroups;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.foundUser));
          localStorage.setItem('userGroups', JSON.stringify(response.userGroups));
          this.loggedInStatus.next(true);
          this.connectedUser = response.foundUser;
          this.userGroups = response.userGroups;
        }
      }),
      catchError(error => {
        console.error('Erreur de login:', error);
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userGroups');
    this.loggedInStatus.next(false);
    this.connectedUser = null;
    this.userGroups = [];
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('Token in validateToken:', token); // Debugging
    if (!token) {
      console.log('No token found in localStorage'); // Debugging
      return of(false); // No token means the user is not logged in
    }
    // Send the token in the Authorization header
    return this.http.post<{ valid: boolean }>(
      `${this.apiUrl}/authenticate`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      }
    ).pipe(
      tap(response => console.log('Token validation response:', response)), // Debugging
      map(response => response.valid), // Extract the validity of the token
      catchError((error) => {
        console.error('Error validating token:', error); // Debugging
        return of(false); // Handle errors (e.g., network issues)
      })
    );
  }
}