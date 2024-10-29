import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-mobile-form',
  templateUrl: './payment-mobile-form.component.html',
  styleUrls: ['./payment-mobile-form.component.css']
})
export class PaymentMobileFormComponent implements OnInit {
  paymentForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      amount: ['', [Validators.required, Validators.min(100)]]
    });
  }

  ngOnInit(): void {}

  pay(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const paymentData = this.paymentForm.value;

    // Remplacez '/api/payments/mobile-money' par l'URL de votre API backend
    this.http.post('/api/payments/mobile-money', paymentData).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          this.successMessage = 'Le paiement a été effectué avec succès!';
        } else {
          this.errorMessage = 'Le paiement a échoué. Veuillez réessayer.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du paiement. Veuillez réessayer.';
        console.error('Payment error:', error);
      }
    });
  }
}
