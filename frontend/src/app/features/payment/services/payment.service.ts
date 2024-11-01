import { Injectable } from '@angular/core';
import { PaymentLoggingService } from './payment-logging.service';
import { Transaction } from '../models/transaction.model';
import { PaymentProviderTransaction } from '../models/payment-provider-transaction.model';
import { Invoice } from '../models/invoice.model';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

declare var FlutterwaveCheckout: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private loggingService: PaymentLoggingService,
    private authService: AuthService,
  ) {}

  makePayment(amount: number, currency: string, p0: { name: string; email: string; }, redirect_url: string) {
    const customer = this.authService.currentUserValue;
  
    if (!FlutterwaveCheckout) {
      this.logError('no-flutterwave', 'Flutterwave SDK not loaded');
      return;
    }

    // Étape 1 : Créer une transaction "pending" dans la BD
    this.createPendingTransaction(amount, currency, customer).subscribe({
      next: (transaction) => {
        FlutterwaveCheckout({
          public_key: environment.FLW_PUBLIC_KEY,
          tx_ref: transaction._id.toString(),
          amount: 500,
          currency: 'XOF',
          payment_options: "card, banktransfer, ussd",
          redirect_url: 'payment-succes/',
          meta: {
            consumer_id: customer?._id,
            consumer_mac: this.getConsumerMac(),
          },
          customer: {
            email: customer?.email,
            phone_number: '70987031',
            name: customer?.username,
          },
          customizations: {
            title: "My Store",
            description: "Payment for selected items",
            logo: "https://www.example.com/logo.png"
          },
          callback: (data: any) => this.handlePaymentCallback(data, transaction),
          onclose: () => this.logInfo(transaction._id, 'Payment cancelled by user')
        });
      },
      error: () => {
        this.logError('transaction-error', 'Failed to create pending transaction');
      }
    });
  }
  
  private handlePaymentCallback(data: any, transaction: Transaction) {
    if (data.status === "successful") {
      this.updateTransactionStatus(transaction._id, 'completed').subscribe({
        next: () => {
          this.createProviderTransaction(transaction._id, data.transaction_id).subscribe({
            next: () => {
              this.createInvoice(transaction).subscribe({
                next: () => this.logInfo(transaction._id, 'Payment completed successfully'),
                error: () => this.logError(transaction._id, 'Failed to create invoice')
              });
            },
            error: () => this.logError(transaction._id, 'Failed to create provider transaction')
          });
        },
        error: () => this.logError(transaction._id, 'Failed to update transaction status to completed')
      });
    } else {
      this.updateTransactionStatus(transaction._id, 'failed').subscribe({
        next: () => this.logError(transaction._id, 'Payment failed'),
        error: () => this.logError(transaction._id, 'Failed to update transaction status to failed')
      });
    }
  }

  private createPendingTransaction(amount: number, currency: string, customer: any) {
    const transactionData: Partial<Transaction> = {
      userId: customer._id,
      amount,
      currency,
      status: 'pending',
      description: 'Initiating payment',
    };
    
    return this.loggingService.createTransaction(transactionData).pipe(
      catchError(error => {
        this.logError('transaction-error', 'Failed to create pending transaction');
        return throwError(() => error);
      })
    );
  }
  
  private updateTransactionStatus(transactionId: string, status: string) {
    return this.loggingService.updateTransaction(transactionId, 'complet').pipe(
      catchError(error => {
        this.logError(transactionId, `Failed to update transaction status to ${status}`);
        return of(null);
      })
    );
  }
  
  private createProviderTransaction(transactionId: string, providerId: string) {
    const providerTransaction: Partial<PaymentProviderTransaction> = {
      transactionId,
      providerId: providerId,
    };
    return this.loggingService.createProviderTransaction(providerTransaction).pipe(
      catchError(error => {
        this.logError(transactionId, 'Failed to create provider transaction');
        return throwError(() => error);
      })
    );
  }
  
  private createInvoice(transaction: Transaction) {
    const invoice: Partial<Invoice> = {
      transactionId: transaction._id,
      status: 'paid'
    };
    return this.loggingService.createInvoice(invoice).pipe(
      catchError(error => {
        this.logError(transaction._id, 'Failed to create invoice');
        return throwError(() => error);
      })
    );
  }
  
  private logError(reference: string, message: string) {
    this.loggingService.logPayment(reference, message, 'error').subscribe();
  }
  
  private logInfo(reference: string, message: string) {
    this.loggingService.logPayment(reference, message, 'info').subscribe();
  }
  
  private getConsumerMac(): string {
    return "92a3-912ba-1192a";
  }
}
