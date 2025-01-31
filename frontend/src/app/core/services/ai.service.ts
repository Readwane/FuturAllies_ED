import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'https://api.votre-ia.com/generate';

  constructor(private http: HttpClient) { }

  generateQuiz(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quiz`, params);
  }

  generateTechnicalTest(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/technical-test`, params);
  }
}