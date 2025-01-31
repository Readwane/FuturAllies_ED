import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Injectable({  
  providedIn: 'root'  
})  
export class QuizService {  
  private apiUrl = 'URL_DE_VOTRE_API';  

  constructor(private http: HttpClient) {}  

  // Appeler l'API pour générer le quiz  
  generateQuiz(): Observable<any> {  
    return this.http.get<any>(`${this.apiUrl}/generate-quiz`);  
  }  
}