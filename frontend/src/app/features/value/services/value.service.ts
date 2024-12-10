// services/service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from '../models/value.model';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private apiUrl = 'http://localhost:3000/fapi/values'; // Remplacer par votre URL d'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les valeurs
  getValues(): Observable<Value[]> {
    return this.http.get<Value[]>(this.apiUrl);
  }

  // Récupérer un Value par ID
  getValueById(id: string): Observable<Value> {
    return this.http.get<Value>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle valeur
  createValue(value: Value): Observable<Value> {
    return this.http.post<Value>(this.apiUrl, value);
  }

  // Mettre à jour un valeur existant
  updateValue(id: string, value: Value): Observable<Value> {
    return this.http.put<Value>(`${this.apiUrl}/${id}`, value);
  }

  // Supprimer un valeur
  deleteValue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
