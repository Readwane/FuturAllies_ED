import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  // Appel pour obtenir et définir l'utilisateur après connexion
  fetchCurrentUser() {
    this.http.get<User>('/api/current-user').subscribe(user => {
      this.currentUser.next(user);
    });
  }

  // Exposer l'utilisateur comme un observable
  get user$(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  // Accès direct à l'utilisateur pour des cas spécifiques
  get currentUserValue(): User | null {
    return this.currentUser.value;
  }
}
