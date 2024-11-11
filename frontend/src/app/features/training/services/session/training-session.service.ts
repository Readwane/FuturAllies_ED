import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingSession } from '../../models/training-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private apiUrl = 'http://localhost:3000/api/training-sessions'; // Remplacez par l'URL de votre API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer toutes les séances de formation
  getTrainingSessions(): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(this.apiUrl, this.httpOptions);
  }

  // Récupérer une séance de formation par ID
  getTrainingSessionById(id: string): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Créer une nouvelle séance de formation
  createTrainingSession(trainingSession: TrainingSession): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(`${this.apiUrl}/create`, trainingSession, this.httpOptions);
  }

  // Mettre à jour une séance de formation par ID
  updateTrainingSession(id: string, trainingSession: TrainingSession): Observable<TrainingSession> {
    return this.http.put<TrainingSession>(`${this.apiUrl}/${id}/update`, trainingSession, this.httpOptions);
  }

  // Supprimer une séance de formation par ID
  deleteTrainingSession(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`, this.httpOptions);
  }
}
