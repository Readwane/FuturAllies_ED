import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingModule } from '../../training.module';

@Injectable({
  providedIn: 'root'
})
export class TrainingModuleService {
  private apiUrl = 'http://localhost:3000/api/training-modules'; // Remplacez par l'URL de votre API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les modules de formation
  getTrainingModules(): Observable<TrainingModule[]> {
    return this.http.get<TrainingModule[]>(this.apiUrl, this.httpOptions);
  }

  // Récupérer un module de formation par ID
  getTrainingModuleById(id: string): Observable<TrainingModule> {
    return this.http.get<TrainingModule>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Créer un nouveau module de formation
  createTrainingModule(trainingModule: TrainingModule): Observable<TrainingModule> {
    return this.http.post<TrainingModule>(`${this.apiUrl}/create`, trainingModule, this.httpOptions);
  }

  // Mettre à jour un module de formation par ID
  updateTrainingModule(id: string, trainingModule: TrainingModule): Observable<TrainingModule> {
    return this.http.put<TrainingModule>(`${this.apiUrl}/${id}/update`, trainingModule, this.httpOptions);
  }

  // Supprimer un module de formation par ID
  deleteTrainingModule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`, this.httpOptions);
  }
}
