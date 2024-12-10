// services/service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from 'src/app/features/value/models/value.model';

@Injectable({
  providedIn: 'root',
})
export class HomeServicesService {
  private apiUrl = 'http://localhost:3000/fapi/values'; // Remplacer par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les services
  getServices(): Observable<Value[]> {
    return this.http.get<Value[]>(this.apiUrl);
  }

  // Récupérer un service par ID
  getServiceById(id: string): Observable<Value> {
    return this.http.get<Value>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau service
  createService(service: Value): Observable<Value> {
    return this.http.post<Value>(this.apiUrl, service);
  }

  // Mettre à jour un service existant
  updateService(id: string, service: Value): Observable<Value> {
    return this.http.put<Value>(`${this.apiUrl}/${id}`, service);
  }

  // Supprimer un service
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
