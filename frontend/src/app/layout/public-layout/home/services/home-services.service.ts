// services/service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/core/models/service/service.model';

@Injectable({
  providedIn: 'root',
})
export class HomeServicesService {
  private apiUrl = 'http://localhost:3000/fapi/services'; // Remplacer par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  // Récupérer un service par ID
  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau service
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  // Mettre à jour un service existant
  updateService(id: string, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, service);
  }

  // Supprimer un service
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
