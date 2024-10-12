import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/fidalli'; // Base URL de votre API




  public nom:any='ll';
  public prenom: any ="mmmm";

  constructor(private http: HttpClient) {
    this.nom = localStorage.getItem('nom');
    this.prenom = localStorage.getItem('prenom');
  }



  updateUserInfo(nom: string, prenom: string): void {
    this.nom = nom;
    this.prenom = prenom;
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
  }

  // Méthode pour la connexion
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  // Méthode pour le refresh du token (si nécessaire)
  refreshToken(refresh: string): Observable<any> {
    const url = `${this.apiUrl}/token/refresh/`;
    const body = { refresh };
    return this.http.post(url, body);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
