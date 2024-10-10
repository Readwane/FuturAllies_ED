import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Webinar } from './models/webinar.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private apiUrl = 'http://localhost:3000/fapi/webinars'; // Adresse de votre API

  constructor(private http: HttpClient) {}

  getWebinars(): Observable<Webinar[]> {
    return this.http.get<Webinar[]>(this.apiUrl);
  }

  getWebinarById(id: string): Observable<Webinar> {
    return this.http.get<Webinar>(`${this.apiUrl}/${id}`);
  }

   // Method to enroll a user in a webinar
   enrollToWebinar(enrollData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/webinars/enroll`, enrollData);
  }
}
