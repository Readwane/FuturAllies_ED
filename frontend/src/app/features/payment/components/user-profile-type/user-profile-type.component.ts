import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-account-selection',
  templateUrl: './user-profile-type.component.html',
  styleUrls: ['./user-profile-type.component.css']
})
export class UserProfileTypeComponent {
  

  constructor(
    private router: Router,
    private paymentService: PaymentService
  ) {}

  onSelectFreemium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'freemium' } });
  }

  onSelectPremium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'premium' } });
  }

  // Méthode appelée lors du clic
onFreemiumClick(event: Event) {
  event.preventDefault(); // Empêche la redirection

  // Appel de la méthode makePayment du service
  this.paymentService.makePayment(10, 'USD', { name: 'John Doe', email: 'john@example.com' }, 'signup/');
}

}
