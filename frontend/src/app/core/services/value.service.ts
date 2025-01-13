import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private apiUrl = 'http://localhost:3000/fapi';  // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les valeurs
  getValues(): Observable<any> {
    return this.http.get(`${this.apiUrl}/values`);
  }

  // Récupérer une valeur par son ID
  getValueById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/values/${id}`);
  }

  // Créer une nouvelle valeur
  createValue(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/values`, data);
  }

  // Mettre à jour une valeur
  updateValue(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/values/${id}`, data);
  }

  // Supprimer une valeur
  deleteValue(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/values/${id}`);
  }
}
