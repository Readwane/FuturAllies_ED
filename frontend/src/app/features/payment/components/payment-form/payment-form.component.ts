import { Component, OnInit, ViewChild } from '@angular/core';

import { StripeService} from 'ngx-stripe';
import { StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(StripeCardComponent)
  cardElement!: StripeCardComponent;

  paymentForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient
  ) {
    this.paymentForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {}

  pay(): void {
    this.loading = true;
    this.errorMessage = null;

    const amount = 5000; // Par exemple, 50,00 USD (défini en cents)
    this.http.post('/fapi/create-payment-intent', { amount }).subscribe({
      next: (response: any) => {
        const clientSecret = response.clientSecret;

        this.stripeService
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.cardElement.element, // Utilisez `this.cardElement.element` pour obtenir l'élément de carte
              billing_details: {
                name: this.paymentForm.get('name')?.value
              }
            }
          })
          .subscribe({
            next: (result) => {
              this.loading = false;
              if (result.paymentIntent?.status === 'succeeded') {
                alert('Payment successful!');
              } else {
                this.errorMessage = 'Payment not successful. Please try again.';
              }
            },
            error: (error) => {
              this.loading = false;
              this.errorMessage = 'Payment failed. Please try again.';
              console.error('Payment error:', error);
            }
          });
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to create payment intent. Please try again.';
        console.error('Error creating payment intent:', error);
      }
    });
  }
}