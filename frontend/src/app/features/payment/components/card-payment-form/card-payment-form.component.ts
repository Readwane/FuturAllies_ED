import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './card-payment-form.component.html',
  styleUrls: ['./card-payment-form.component.css']
})
export class CardPaymentFormComponent implements OnInit {

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
    locale: 'fr'
  };

  constructor(
    private fb: FormBuilder,
    private paymentService: TransactionService
  ) {
    this.paymentForm = this.fb.group({
      cardHolder: [''],
    });
  }

  ngOnInit(): void {}

  onCardFormSubmit(cardDetails: any): void {
    // Ici, `cardDetails` contient les données du formulaire
    console.log(' Données:', cardDetails);

    this.loading = true;
    this.errorMessage = null;

    const amount = 5000; // 50,00 USD en cents par exemple
    const cardHolderName = cardDetails.cardName;  // Utilisation de cardDetails

    this.paymentService.createPaymentIntent(amount).subscribe({
      next: (response: any) => {
        const clientSecret = response.clientSecret;

        this.paymentService.confirmCardPayment(clientSecret, this.cardElement.element, cardHolderName)
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
