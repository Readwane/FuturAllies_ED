import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { StripeCardElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = '/fapi/create-payment-intent'; // Remplacez par votre URL de backend si nécessaire

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) {}

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(this.apiUrl, { amount });
  }

  confirmCardPayment(clientSecret: string, cardElement: StripeCardElement, cardHolderName: string) {
    return this.stripeService.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: cardHolderName }
      }
    });
  }
}
