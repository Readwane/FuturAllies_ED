import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/fapi/transactions'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les transactions
  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer une transaction par son ID
  getTransactionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Créer une nouvelle transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, transactionData).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour une transaction par son ID
  updateTransaction(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/update`, { status }).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour une transaction par son ID
  updateTransactionStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer une transaction par son ID
  deleteTransaction(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/delete`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Gestion des erreurs HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur côté serveur : Code ${error.status}, Message : ${error.message}`;
    }
    console.error(errorMessage); // Log de l'erreur
    return throwError(errorMessage);
  }
}
