import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost/fapi'; 

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir la liste des utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Méthode pour modifier un utilisateur
  editUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Méthodes pour gérer les autres entités (offres, formations, etc.)
  getTrainings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trainings`);
  }

  getOffers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/offers`);
  }

  // Ajoutez d'autres méthodes pour les appels API selon vos besoins
}
