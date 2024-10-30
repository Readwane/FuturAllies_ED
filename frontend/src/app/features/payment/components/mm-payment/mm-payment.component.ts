import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moov-payment',
  templateUrl: './mm-payment.component.html',
  styleUrls: ['./mm-payment.component.css'],
})
export class MmPaymentComponent {
  phoneNumber: string = ''; // Variable pour stocker le numéro de téléphone
  otpCode: string = ''; // Variable pour stocker le code OTP

  constructor(private router: Router) {}

  // Fonction pour gérer la soumission du paiement
  submitPayment() {
    // Valider les entrées (facultatif, mais recommandé)
    if (!this.phoneNumber || !this.otpCode) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Logique pour gérer le paiement avec les informations fournies
    // Exemple: Envoi des données au backend ou à un service de paiement

    console.log('Numéro de téléphone:', this.phoneNumber);
    console.log('Code OTP:', this.otpCode);

    // Rediriger l'utilisateur vers une page de confirmation ou de succès
    this.router.navigate(['/payment-success']); // Ajustez ce chemin selon vos besoins
  }
}
