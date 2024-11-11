import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer!: Offer;
  offerId!: string;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.getOfferDetails();
  }

  getOfferDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID de l\'offre récupéré :', id);
    if (id) {
      this.offerId = id;
      this.loading = true;
      this.offerService.getOfferById(id).subscribe(
        (data: Offer) => {
          this.offer = data;
          this.loading = false;
        },
        error => {
          console.error('Erreur lors de la récupération des détails de l\'offre', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Aucun ID d\'offre fourni.');
    }
  }

  register(): void {
    this.router.navigate(['/offers/application', this.offerId]);
  }
}
