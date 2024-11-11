import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer!: Offer; // Reçoit les données de l'offre en tant qu'entrée

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Offre reçue dans OfferComponent:', this.offer);
    console.log('Titre de l\'offre reçu :', this.offer.title);

    if (!this.offer || !this.offer._id) {
      console.error("L'offre n'a pas été correctement chargée ou l'ID (_id) est manquant.");
    } else {
      console.log('ID de l\'offre reçu (_id) :', this.offer._id);
    }
  }
}
