// services/domain.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from '../models/domain.model';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private apiUrl = 'http://localhost:3000/fapi/domains'; // Remplacer par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer les domaines paginés
  getDomains(pageIndex: number = 0, pageSize: number = 6): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${pageIndex}&limit=${pageSize}`);
  }

  // Récupérer un domaine par ID
  getDomainById(id: string): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau domaine
  createDomain(domain: Domain): Observable<Domain> {
    return this.http.post<Domain>(this.apiUrl, domain);
  }

  // Mettre à jour un domaine existant
  updateDomain(id: string, domain: Domain): Observable<Domain> {
    return this.http.put<Domain>(`${this.apiUrl}/${id}`, domain);
  }

  // Supprimer un domaine
  deleteDomain(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
