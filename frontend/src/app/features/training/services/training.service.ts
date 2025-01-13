import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = 'http://localhost:3000/fapi';  // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Obtenir toutes les formations
  getTrainings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trainings`);
  }

  // Obtenir une formation par son ID
  getTrainingById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trainings/${id}`);
  }

  // Mettre à jour une formation
  updateTraining(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/trainings/${id}`, data);
  }

  // Supprimer une formation
  deleteTraining(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/trainings/${id}`);
  }

  // Obtenir tous les modules de formation
  getTrainingModules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-modules`);
  }

  // Obtenir un module de formation par son ID
  getTrainingModuleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-modules/${id}`);
  }

  // Créer un nouveau module de formation
  createTrainingModule(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/training-modules`, data);
  }

  // Mettre à jour un module de formation
  updateTrainingModule(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/training-modules/${id}`, data);
  }

  // Supprimer un module de formation
  deleteTrainingModule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/training-modules/${id}`);
  }

  // Obtenir toutes les sessions de formation
  getTrainingSessions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-sessions`);
  }

  // Obtenir une session de formation par son ID
  getTrainingSessionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-sessions/${id}`);
  }

  // Créer une nouvelle session de formation
  createTrainingSession(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/training-sessions`, data);
  }

  // Mettre à jour une session de formation
  updateTrainingSession(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/training-sessions/${id}`, data);
  }

  // Supprimer une session de formation
  deleteTrainingSession(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/training-sessions/${id}`);
  }

  // Obtenir toutes les candidatures pour une formation
  getTrainingApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-applications`);
  }

  // Créer une nouvelle candidature pour une formation
  createTrainingApplication(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/training-applications`, data);
  }

  // Obtenir toutes les candidatures pour un webinar
  getWebinarApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/webinar-applications`);
  }

  // Obtenir toutes les candidatures pour des formations en présentiel
  getInPersonApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/in-person-applications`);
  }

  // Obtenir une candidature pour une formation par son ID
  getTrainingApplicationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/training-applications/${id}`);
  }

  // Mettre à jour une candidature pour une formation
  updateTrainingApplication(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/training-applications/${id}`, data);
  }

  // Supprimer une candidature pour une formation
  deleteTrainingApplication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/training-applications/${id}`);
  }
}
