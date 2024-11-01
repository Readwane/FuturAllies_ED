
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecruitmentService } from '../../services/recruitment.service';
import { Offer } from '../../models/offer.model';
import { OfferStats } from '../../models/offer-stats.model';

@Component({
  selector: 'app-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrl: './offer-management.component.css'
})
export class OfferManagementComponent {
isLoggedIn: any;
viewApplications(arg0: any) {
throw new Error('Method not implemented.');
}
deleteOffer(arg0: any) {
throw new Error('Method not implemented.');
}
editOffer(arg0: any) {
throw new Error('Method not implemented.');
}
getApplicationsCount(arg0: any) {
throw new Error('Method not implemented.');
}
logout() {
throw new Error('Method not implemented.');
}
login() {
throw new Error('Method not implemented.');
}
  isDashboardVisible = true;
  isCreateOfferVisible = false;
  offerForm: FormGroup;
  offerStats: OfferStats[] = [];
  offers: Offer[] = [];

  constructor(private fb: FormBuilder, private recruitmentService: RecruitmentService) {
    this.offerForm = this.fb.group({
      title: [''],
      description: [''],
      type: ['Job'],
      status: ['Open'],
      location: [''],
      salary: [null],
      postedDate: [new Date()]
    });
  }

  ngOnInit() {
    this.loadStats();
    this.loadOffers();
  }

  loadStats() {
    this.recruitmentService.getStats().subscribe(stats => this.offerStats = stats);
  }

  loadOffers() {
    this.recruitmentService.getOffers().subscribe(offers => this.offers = offers);
  }

  onSubmit() {
    const newOffer = this.offerForm.value as Offer;
    this.recruitmentService.createOffer(newOffer).subscribe(() => this.loadOffers());
  }

  showDashboard() { this.isDashboardVisible = true; this.isCreateOfferVisible = false; }
  showCreateOffer() { this.isDashboardVisible = false; this.isCreateOfferVisible = true; }
}
