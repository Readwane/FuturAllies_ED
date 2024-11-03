import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { PaymentService } from '../../services/payment.service';
import { User } from 'src/app/core/models/user.model';
import { Profile } from 'src/app/core/models/profile.model';

@Component({
  selector: 'app-account-selection',
  templateUrl: './user-profile-type.component.html',
  styleUrls: ['./user-profile-type.component.css']
})
export class UserProfileTypeComponent implements OnInit{

  
  user: User | null = null;
  profile: Profile | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    // private transactionService: TransactionService,
    private paymentService: PaymentService
  ) {}


  ngOnInit(): void {
    const username = 'Tegawende'; // Exemple de nom d'utilisateur à rechercher
    this.paymentService.getUserAndProfile(username).subscribe(
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
  }


  onSelectFreemium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'freemium' } });
  }

  onSelectPremium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'premium' } });
  }

  // Méthode appelée lors du clic
  onFreemiumClick(event: Event) {
    event.preventDefault(); // Empêche la redirection
    this.paymentService.onMakePayment(5400, 'XOF');
  }

}
