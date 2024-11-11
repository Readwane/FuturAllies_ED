import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingApplication } from '../../models/training-application.model'; // Importer le modèle d'application de formation

@Injectable({
  providedIn: 'root'
})
export class TrainingApplicationService {
  private apiUrl = 'http://localhost:3000/fapi/training-applications'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  // Créer une nouvelle application de formation
  createTrainingApplication(applicationData: TrainingApplication): Observable<TrainingApplication> {
    return this.http.post<TrainingApplication>(`${this.apiUrl}/create`, applicationData);
  }

  // Récupérer toutes les applications de formation
  getTrainingApplications(): Observable<TrainingApplication[]> {
    return this.http.get<TrainingApplication[]>(this.apiUrl);
  }

  // Récupérer toutes les applications de type "webinar"
  getWebinarApplications(): Observable<TrainingApplication[]> {
    return this.http.get<TrainingApplication[]>(`${this.apiUrl}/webinars`);
  }

  // Récupérer toutes les applications de type "in-person"
  getInPersonApplications(): Observable<TrainingApplication[]> {
    return this.http.get<TrainingApplication[]>(`${this.apiUrl}/in-person`);
  }

  // Récupérer une application de formation par son ID
  getTrainingApplicationById(id: string): Observable<TrainingApplication> {
    return this.http.get<TrainingApplication>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une application de formation par son ID
  updateTrainingApplication(id: string, applicationData: TrainingApplication): Observable<TrainingApplication> {
    return this.http.put<TrainingApplication>(`${this.apiUrl}/${id}/update`, applicationData);
  }

  // Supprimer une application de formation par son ID
  deleteTrainingApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }
}
