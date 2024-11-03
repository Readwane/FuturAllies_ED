import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Profile } from 'src/app/core/models/profile.model';
import { UserService } from './user.service';
import { Transaction } from '../models/transaction.model';
import { PaymentLoggingService } from './payment-logging.service';
import { PaymentProviderTransaction } from '../models/payment-provider-transaction.model';
import { Invoice } from '../models/invoice.model';
import { TransactionService } from './transaction.service';

declare var FlutterwaveCheckout: any;


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/fapi'; // URL de votre API

  user!: User;
  profile!: Profile;
  errorMessage: string = '';

  card_options: string[] = ["card, banktransfer, ussd"];

  constructor(
     private http: HttpClient,
     private userService: UserService,
     private loggingService: PaymentLoggingService,
     private transactionService: TransactionService
    ) {}

    getUserAndProfile(username: string): Observable<{ user: User, profile: Profile }> {
      return new Observable(observer => {
        console.log('Début de la récupération de l\'utilisateur par nom:', username);
        
        this.userService.getUserByUsername(username).subscribe(
          userData => {
            if (!userData) {
              console.warn('Aucun utilisateur trouvé avec ce username:', username);
              observer.error('Utilisateur non trouvé');
              return;
            }
            
            const user = userData;
            console.log('Utilisateur trouvé avec succès:', user);
    
            // Vérification de l'ID utilisateur avant la récupération du profil
            if (user && user._id) {
              console.log('Début de la récupération du profil pour userId:', user._id);
    
              this.userService.getProfileByUserId(user._id).subscribe(
                profileData => {
                  if (!profileData) {
                    console.warn('Profil non trouvé pour l\'utilisateur:', user._id);
                    observer.error('Profil non trouvé');
                    return;
                  }
    
                  const profile = profileData;
                  console.log('Profil de l\'utilisateur trouvé:', profile);
                  observer.next({ user, profile });
                  observer.complete();
                },
                error => {
                  console.error('Erreur lors de la récupération du profil:', error);
                  observer.error('Erreur lors de la récupération du profil de l\'utilisateur');
                }
              );
            } else {
              console.warn('ID utilisateur non trouvé pour le profil');
              observer.error('ID utilisateur non valide pour le profil');
            }
          },
          error => {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            observer.error('Utilisateur non trouvé ou erreur de serveur');
          }
        );
      });
    }
    


  onMakePayment(mount: number, devise: string) {
    const username = 'Tegawende'; // Exemple de nom d'utilisateur à rechercher
    this.getUserAndProfile(username).subscribe(
      ({ user, profile }) => {
        this.user = user;
        this.profile = profile;
        console.log('Utilisateur trouvé:', this.user);
        console.log('Profil de l\'utilisateur trouvé:', this.profile);
      },
      (error) => {
        this.errorMessage = error; // Gérer l'erreur
        console.error(error);
      }
    );

    if (!FlutterwaveCheckout) {
      this.logError('no-flutterwave', 'Flutterwave SDK not loaded');
      return;
    }

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
      tx_ref: "txref-DI0NzMx13",
      amount: mount,
      currency: devise,
      payment_options: this.card_options,
      meta: {
        source: "docs-inline-test",
        consumer_mac: this.getConsumerMac(),
      },
      customer: {
        email: 'tegawendego@gmail.com',
        phone_number:'70987031',
        name: 'Tegawende',
      },
      customizations: {
        title: "Flutterwave Developers",
        description: "Test Payment",
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
      callback: (data: any) => {
        console.log("payment callback:", data);
      },
      onclose: () => {
        console.log("Payment cancelled!");
      }
    });
  }

  private handlePaymentCallback(data: any, transaction: Transaction) {
    if (data.status === "successful") {
      this.createTransaction(transaction.amount, 'pending').subscribe({
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


  private createTransaction(amount: number, status: 'pending') {
    const transactionData: Partial<Transaction> = {
      userId: this.user._id,
      paymentMethodId: '45dnndhgsgfsfjqhhss',
      providerId: 'flutterwave.id',
      issueTransaction: 'subscription',
      amount: amount,
      currency: 'XOF',
      status,
      description: 'Initiating payment',
    };
    return this.loggingService.createTransaction(transactionData).pipe(
      catchError(error => {
        this.logError('transaction-error', 'Failed to create pending transaction');
        return throwError(error);
      })
    );
  }
  
  private updateTransactionStatus(transactionId: string, status: string) {
    return this.transactionService.updateTransactionStatus(transactionId, status).pipe(
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
  
  private createInvoice(transaction: Transaction) {
    const invoice: Partial<Invoice> = {
      transactionId: transaction._id,
      status: 'paid'
    };
    return this.loggingService.createInvoice(invoice).pipe(
      catchError(error => {
        this.logError(transaction._id, 'Failed to create invoice');
        return throwError(error);
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
