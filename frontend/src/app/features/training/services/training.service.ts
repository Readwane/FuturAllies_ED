import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model'; // Importez votre modèle Training si vous en avez un

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = 'http://localhost:3000/fapi/trainings'; // Remplacez par l'URL de votre API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations
  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}`, this.httpOptions);
  }

  // Récupérer toutes les formations de type "webinaire"
  getWebinars(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/webinars`, this.httpOptions);
  }

  // Récupérer toutes les formations en présentiel
  getInPersonTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/in-person`, this.httpOptions);
  }

  // Créer une nouvelle formation
  createTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/create`, training, this.httpOptions);
  }

  // Récupérer une formation par ID
  getTrainingById(id: string): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Mettre à jour une formation par ID
  updateTraining(id: string, training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/${id}/update`, training, this.httpOptions);
  }

  // Supprimer une formation par ID
  deleteTraining(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`, this.httpOptions);
  }
}
