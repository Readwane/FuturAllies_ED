import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-otp',
  templateUrl: './om-payment.component.html',
  styleUrls: ['./om-payment.component.css'],
})
export class OmPaymentComponent {
  phoneNumber: string = '';
  otpCode: string = '';

  constructor(private router: Router) {}

  submitPayment() {
    if (this.phoneNumber && this.otpCode) {
      // Logique pour gérer le paiement
      console.log('Numéro de téléphone:', this.phoneNumber);
      console.log('Code OTP:', this.otpCode);
      // Rediriger vers une autre page après le traitement, par exemple une page de confirmation
      this.router.navigate(['/confirmation']);
    } else {
      alert('Veuillez entrer tous les champs requis.');
    }
  }
}
