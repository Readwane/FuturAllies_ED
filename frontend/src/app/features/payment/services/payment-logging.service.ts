import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';
import { PaymentProviderTransaction } from '../models/payment-provider-transaction.model';
import { PaymentLog } from '../models/payment-log.model';
import { Invoice } from '../models/invoice.model';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentLoggingService {

  // Mettre à jour le statut de la transaction
  updateTransaction(transactionId: string, status: string): Observable<void> {
    const url = `${this.apiUrl}/${transactionId}`; // URL complète de la transaction
    const body = { status };

    return this.http.put<void>(url, body).pipe(
      catchError(error => {
        console.error(`Erreur lors de la mise à jour de la transaction ${transactionId}: `, error);
        return of(); // Retourne un Observable void en cas d'erreur
      })
    );
  }

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Enregistrer une transaction
  createTransaction(transaction: Partial<Transaction>) {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions/create`, transaction);
  }

  // Enregistrer une transaction auprès d'un fournisseur de paiement
  createProviderTransaction(providerTransaction: Partial<PaymentProviderTransaction>) {
    return this.http.post<PaymentProviderTransaction>(`${this.apiUrl}/payment-provider-transactions/create`, providerTransaction);
  }

  // Ajouter un log de paiement
  logPayment(transactionId: string, message: string, logType: 'info' | 'error') {
    const paymentLog: Partial<PaymentLog> = { transactionId, message, logType, createdAt: new Date() };
    return this.http.post<PaymentLog>(`${this.apiUrl}/api/payment-logs/create`, paymentLog);
  }

  // Générer une facture
  createInvoice(invoice: Partial<Invoice>) {
    return this.http.post<Invoice>(`${this.apiUrl}/api/invoices/create`, invoice);
  }
}
