import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  generateQuiz(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quiz/gen`, params).pipe(
      catchError(this.handleError)
    );
  }

  generateTechnicalTest(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/eval/gen`, params).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);
    return throwError(() => new Error('Erreur de connexion au serveur'));
  }
}
