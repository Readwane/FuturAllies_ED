import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../../models/trainer.model';
@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'http://localhost:3000/api/trainers'; // Remplacez par l'URL de votre API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les formateurs
  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl, this.httpOptions);
  }

  // Récupérer un formateur par ID
  getTrainerById(id: string): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Créer un nouveau formateur
  createTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/create`, trainer, this.httpOptions);
  }

  // Mettre à jour un formateur par ID
  updateTrainer(id: string, trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${id}/update`, trainer, this.httpOptions);
  }

  // Supprimer un formateur par ID
  deleteTrainer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`, this.httpOptions);
  }
}
