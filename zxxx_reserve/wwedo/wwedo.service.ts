// services/wwedo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wwedo } from './models/wwedo.model'; // Import du modèle Wwedo

@Injectable({
  providedIn: 'root',
})
export class WwedoService {
  private apiUrl = 'http://localhost:3000/fapi/wwedos'; // Remplacer par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les services
  getWwedos(): Observable<Wwedo[]> {
    return this.http.get<Wwedo[]>(this.apiUrl);
  }

  // Récupérer un service par ID
  getWwedoById(id: string): Observable<Wwedo> {
    return this.http.get<Wwedo>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau service
  createWwedo(wwedo: Wwedo): Observable<Wwedo> {
    return this.http.post<Wwedo>(this.apiUrl, wwedo);
  }

  // Mettre à jour un service existant
  updateWwedo(id: string, wwedo: Wwedo): Observable<Wwedo> {
    return this.http.put<Wwedo>(`${this.apiUrl}/${id}`, wwedo);
  }

  // Supprimer un service
  deleteWwedo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
