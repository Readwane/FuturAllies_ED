import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';  
import { TransactionService } from '../../services/transaction/transaction.service';
import { FltwPaymentService} from '../../services/fltw-payment/fltw-payment.service';  
import { User } from 'src/app/features/user/models/user.model';  
import { UserService } from 'src/app/features/user/services/user.service';  

@Component({  
  selector: 'app-account-selection',  
  templateUrl: './user-profile-type.component.html',  
  styleUrls: ['./user-profile-type.component.css']  
})


export class UserProfileTypeComponent implements OnInit {  
  user!: User; // Stockez l'utilisateur sans Observable  

  constructor(  
    private router: Router,  
    private paymentService: FltwPaymentService,  
    private userService: UserService  
  ) {}  

  ngOnInit(): void {  
    this.getUser('Tegawende'); // Remplacez par le nom d'utilisateur que vous voulez rechercher  
  }  



  getUser(username: string): void {  
    this.userService.getUserByUsername(username).subscribe({  
      next: (user) => {  
        this.user = user;  // Stockez directement l'utilisateur  
        console.log(`Utilisateur trouvé (dans service userProfileType):`, this.user); // Affichage de l'utilisateur  
      },  
      error: (error) => {  
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);  
      }  
    });  
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

    // Assurez-vous que l'utilisateur est défini avant de passer à makePayment  
    if (this.user) {  
      this.paymentService.makePayment(this.user, 1000, 'NGN', '/subscription');  
    } else {  
      console.error('Utilisateur non défini, impossible de procéder au paiement.');  
    }  
  }  
}