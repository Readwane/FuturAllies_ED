// payment.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-card-form.component.html',
  styleUrls: ['./payment-card-form.component.css']
})
export class PaymentCardFormComponent {
  paymentDetails: any = {};

  onSubmit() {
    if (this.validatePaymentDetails(this.paymentDetails)) {
      console.log('Détails du paiement:', this.paymentDetails);
      // Envoyez les détails à votre serveur pour traitement
    } else {
      console.error('Détails du paiement invalides');
    }
  }

  validatePaymentDetails(details: any): boolean {
    // Ajoutez votre logique de validation ici
    return true;
  }
}
