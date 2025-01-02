import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { catchError, Observable, throwError } from 'rxjs';  
import { Enterprise } from '../../../core/models/user/enterprise.model'; // Assurez-vous d'avoir un modèle d'Enterprise défini  
import { environment } from 'src/environments/environment';

@Injectable({  
  providedIn: 'root'  
})  
export class EnterpriseService {  
  private apiUrl = `${environment.apiBaseUrl}/enterprises`; // Remplacez par l'URL de votre API  

  private httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  };  

  constructor(private http: HttpClient) {}  

  // Créer une nouvelle entreprise
  createEnterprise(enterprise: Partial<Enterprise>): Observable<Enterprise> {
    return this.http.post<Enterprise>(`${this.apiUrl}`, enterprise, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
    // Gestion des erreurs
    private handleError(error: any): Observable<never> {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      return throwError(() => new Error('Une erreur est survenue lors de la création de l\'entreprise. Veuillez réessayer.'));
    }

  // Récupérer une entreprise par son ID  
  getEnterpriseById(id: string): Observable<Enterprise> {  
    return this.http.get<Enterprise>(`${this.apiUrl}/${id}`);  
  }  

  getEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(`${this.apiUrl}`, this.httpOptions);
  }

  searchEnterprises(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${query}`);
  }

  // Mettre à jour une entreprise existante  
  updateEnterprise(id: string, enterprise: Partial<Enterprise>): Observable<Enterprise> {  
    return this.http.put<Enterprise>(`${this.apiUrl}/${id}`, enterprise, this.httpOptions);  
  }  

  // Supprimer une entreprise par son ID  
  deleteEnterprise(id: string): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }  
}