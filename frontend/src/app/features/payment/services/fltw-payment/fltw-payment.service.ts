import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user/user.model';
import { Profile } from 'src/app/core/models/user/profile.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Transaction } from '../../models/transaction.model';
import { PaymentLoggingService } from '../payment-log/payment-logging.service';
import { PaymentProviderTransaction } from '../../models/payment-provider-transaction.model';
import { Invoice } from '../../models/invoice.model';
import { TransactionService } from '../transaction/transaction.service';
import { environment } from 'src/environments/environment';

declare var FlutterwaveCheckout: any;

@Injectable({
  providedIn: 'root'
})
export class FltwPaymentService {
  private apiUrl = 'http://localhost:3000/fapi';

  user!: User;
  profile!: Profile;
  errorMessage: string = '';

  card_options: string[] = ["card, banktransfer, mobilemoney ussd"];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private loggingService: PaymentLoggingService,
    private transactionService: TransactionService
  ) {}

  makePayment(customer: User, amount: number, currency: string, redirect_url: string): void {
    if (!this.isFlutterwaveReady()) return;
    if (!this.isCustomerValid(customer)) return;
    console.log('Customer ID dans makepayment:', customer._id);
    this.createPendingTransaction(amount, currency, customer._id).subscribe({
      next: (transaction) => {
        console.log("Transaction created:", transaction);
        this.handleTransaction(transaction, customer, amount, currency, redirect_url);
      },
      error: () => this.logError('transaction-error', 'Failed to create pending transaction')
    });
  }

  private isFlutterwaveReady(): boolean {
    if (!FlutterwaveCheckout) {
      this.logError('no-flutterwave', 'Flutterwave SDK not loaded');
      return false;
    }
    return true;
  }

  private isCustomerValid(customer: User | null): boolean {
    if (!customer) {
      this.logError('customer-not-found', 'Customer not found');
      return false;
    }
    return true;
  }

  private handleTransaction(transaction: any, customer: User, amount: number, currency: string, redirect_url: string): void {
    console.log(`Transaction créé (avant appel flutterwave):`, transaction);
    console.log(`Transaction ID:`, transaction.data._id);

    if (!transaction || !transaction.data._id) {
      this.logError('transaction-id-undefined', 'Transaction ID is undefined');
      return;
    }

    this.initiateFlutterwaveCheckout(transaction.data, customer, amount, currency, redirect_url);
  }

  private initiateFlutterwaveCheckout(transaction: any, customer: User, amount: number, currency: string, redirect_url: string): void {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X", // or : environment.FLW_PUBLIC_KEY,
      tx_ref: transaction._id,
      amount: amount,
      currency: currency,
      payment_options: this.card_options,
      redirect_url: redirect_url,
      meta: {
        consumer_id: customer._id,
        consumer_mac: this.getConsumerMac(),
      },
      customer: {
        email: customer.email,
        phone_number: customer.phone,
        name: customer.username
      },
      customizations: {
        title: "FuturAllies Payment Operation",
        description: "Payment for selected items",
        logo: "https://www.example.com/logo.png"
      },
      callback: (data: any) => this.handlePaymentCallback(data, transaction),
      onclose: () => this.logInfo(transaction._id, 'Payment cancelled by user')
    });
  }

  private handlePaymentCallback(data: any, transaction: any): void {
    const status = data.status === "successful" ? 'completed' : 'failed';
    this.updateTransactionStatus(transaction._id, status).subscribe({
      next: () => {
        if (status === 'completed') {
          this.createProviderTransaction(transaction._id, data.transaction_id).subscribe({
            next: () => {
              this.createInvoice(transaction._id).subscribe({
                next: () => this.logInfo(transaction._id, 'Payment completed successfully'),
                error: () => this.logError(transaction._id, 'Failed to create invoice')
              });
            },
            error: () => this.logError(transaction._id, 'Failed to create provider transaction')
          });
        } else {
          this.logError(transaction._id, 'Payment failed');
        }
      },
      error: () => this.logError(transaction._id, `Failed to update transaction status to ${status}`)
    });
  }

  createPendingTransaction(amount: number, currency: string, userId: string): Observable<Transaction> {
    const transaction: Transaction = {
      userId: userId,  // Ensure userId is correctly assigned
      paymentMethodId: 'paymentMethodId',
      providerId: 'providerId',
      amount,
      currency,
      status: 'pending',
      issueTransaction: 'subscription',
      description: 'Initiating payment',
      date: new Date(),
      _id: ''
    };
  
    console.log('Transaction before saving:', transaction);  // Debug log to confirm userId presence
    console.log('Transaction userID saving:', userId);  // Debug log to confirm userId presence
  
    return this.transactionService.createTransaction(transaction).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de la transaction:', error);
        return throwError(() => new Error('Erreur lors de la création de la transaction'));
      })
    );
  }
  

  private updateTransactionStatus(transactionId: string, status: string) {
    return this.loggingService.updateTransaction(transactionId, status).pipe(
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
        return throwError(error);
      })
    );
  }

  private createInvoice(transactionId: string) {
    const invoice: Partial<Invoice> = {
      transactionId,
      status: 'paid'
    };
    return this.loggingService.createInvoice(invoice).pipe(
      catchError(error => {
        this.logError(transactionId, 'Failed to create invoice');
        return throwError(error);
      })
    );
  }

  private logError(reference: string, message: string) {
    this.loggingService.logPayment(reference, message, 'error').subscribe({
      error: err => console.error('Log Error:', err)
    });
  }

  private logInfo(reference: string, message: string) {
    this.loggingService.logPayment(reference, message, 'info').subscribe({
      error: err => console.error('Log Info Error:', err)
    });
  }

  private getConsumerMac(): string {
    return "92a3-912ba-1192a";
  }
}
