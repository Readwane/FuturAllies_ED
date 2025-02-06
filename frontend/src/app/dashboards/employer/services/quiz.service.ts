import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Content, Evaluation, RecruitmentQuiz, Section } from 'src/app/core/models/evaluation.model';
import { RecruitmentQuizQuestion } from 'src/app/core/models/evaluation.model';
import { environment } from 'src/environments/environment';

@Injectable({  
  providedIn: 'root'  
})  
export class QuizService {  
  private apiUrl = environment.apiBaseUrl;  

  constructor(private http: HttpClient) {}  

  // Appeler l'API pour sauvegarder le quiz  
  saveQuiz(quiz: RecruitmentQuiz, questions: RecruitmentQuizQuestion[]): Observable<any> {  
    console.log('-------------------------- Service  angular -------------------');
    console.log('Quiz envoyé:', quiz);
    console.log('Questions envoyées:', questions);
    return this.http.post<any>(`${this.apiUrl}/quiz/save`, { quiz, questions });
  }

  // Appeler l'API pour générer le quiz  
  saveEvalTest(evaluation: Evaluation, sections: Section[], contents: Content[]): Observable<any> {  
    console.log('-------------------------- quiz service   angular -------------------');
    console.log('suejt envoyé:', evaluation);
    console.log('sections envoyées:', sections);
    console.log('contenues envoyées:', contents);
    return this.http.post<any>(`${this.apiUrl}/eval/save`, { evaluation, sections, contents });
  }

  getQuizzesByOfferId(offerId: string): Observable<RecruitmentQuiz[]> {
    console.log('-------------------------- quiz service   angular -------------------');
    console.log('offerId envoyé:', offerId);
      return this.http.get<RecruitmentQuiz[]>(`${this.apiUrl}/quizz/${offerId}`);
  }
  
  getEvaluationsByOfferId(offerId: string): Observable<Evaluation[]> {
    console.log('-------------------------- quiz service   angular -------------------');
    console.log('offerId envoyé:', offerId);
    return this.http.get<Evaluation[]>(`${this.apiUrl}/eval/${offerId}`);
  }  
}