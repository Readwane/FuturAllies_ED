import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-selection',
  templateUrl: './user-profile-type.component.html',
  styleUrls: ['./user-profile-type.component.css']
})
export class UserProfileTypeComponent {

  constructor(private router: Router) {}

  onSelectFreemium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'freemium' } });
  }

  onSelectPremium() {
    this.router.navigate(['/signup'], { queryParams: { type: 'premium' } });
  }
}
