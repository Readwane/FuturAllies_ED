import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/fapi'; 
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private currentUserName: string | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router) 
    {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInStatus.next(true);
    }
  }

  getUserName(): string | null {
    if (this.currentUserName) {
      return this.currentUserName;
    }
    return null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  // Méthode de login avec mise à jour de l'état
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInStatus.next(true);
          this.currentUserName = username;
        }
      }),
      catchError(error => {
        console.error('Erreur de login:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
    this.currentUserName = null;
  }
}
