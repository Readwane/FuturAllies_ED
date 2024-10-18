import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Webinar } from './models/webinar.model';
import { WebinarEnrollment } from './models/webinar-enrollmnet.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private apiUrl = 'http://localhost:3000/fapi/webinars'; // Adresse de votre API pour les webinaires
  private apiUrlEnrollments = 'http://localhost:3000/fapi/webinarEnrollments/enroll'; // Adresse de votre API pour les inscriptions

  constructor(private http: HttpClient) {}

  getWebinars(): Observable<Webinar[]> {
    return this.http.get<Webinar[]>(this.apiUrl);
  }

  getWebinarById(id: string): Observable<Webinar> {
    return this.http.get<Webinar>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour inscrire un utilisateur à un webinaire
  enrollToWebinar(enrollData: any): Observable<any> {
    return this.http.post<WebinarEnrollment>(this.apiUrlEnrollments, enrollData); // Utilisation de apiUrlEnrollments
  }
}
