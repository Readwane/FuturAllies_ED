import { Component, OnInit } from '@angular/core';

import { Offer } from '../../models/offer.model';
import { RecruitmentService } from '../../services/recruitment.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  loading: boolean = true;
  filterType: string = 'all'; // Type de filtre par défaut

  constructor(
    private recruitmentService: RecruitmentService
  ) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.loading = true;
    this.recruitmentService.getOffers().subscribe(
      (data: Offer[]) => {
        this.offers = data;
        this.applyFilter(); // Appliquer le filtre après chargement
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des offres', error);
        this.loading = false;
      }
    );
  }

  setFilter(type: string): void {
    this.filterType = type;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterType === 'all') {
      this.filteredOffers = this.offers;
    } else {
      this.filteredOffers = this.offers.filter(
        offer => offer.type === this.filterType
      );
    }
  }
}