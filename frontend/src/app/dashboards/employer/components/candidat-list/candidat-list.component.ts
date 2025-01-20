import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { MatTableDataSource } from '@angular/material/table';
import { OfferApplication } from 'src/app/features/offer/models/offer.models';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.css'],
})
export class CandidatListComponent implements OnInit {
  // Colonnes à afficher dans le tableau
  displayedColumns: string[] = ['candidateName', 'offer', 'date', 'status', 'actions'];

  // Source de données pour le tableau
  dataSource = new MatTableDataSource<OfferApplication>();

  // Filtre de recherche
  filterValue: string = '';

  // Paramètres de l'URL
  offerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL
    this.route.params.subscribe((params) => {
      this.offerId = params['id'] || null;

      // Charger les candidatures en fonction des paramètres
      this.loadCandidatures();
    });
  }

  /**
   * Charger les candidatures en fonction des paramètres
   */
  loadCandidatures(): void {
    if (this.offerId) {
      // Si un ID d'offre est fourni, charger les candidatures pour cette offre
      this.offerService.getOfferApplicationsByOfferId(this.offerId).subscribe({
        next: (candidatures) => {
          this.dataSource.data = candidatures;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des candidatures :', err);
        },
      });
    } else {
      // Si aucun ID d'offre n'est fourni, charger toutes les candidatures
      this.offerService.getOfferApplications().subscribe({
        next: (candidatures) => {
          this.dataSource.data = candidatures;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des candidatures :', err);
        },
      });
    }
  }

  /**
   * Appliquer le filtre de recherche
   */
  applyFilter(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  /**
   * Retourne la classe CSS en fonction du statut de la candidature
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Accepted':
        return 'status-accepted';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  /**
   * Accepter une candidature
   */
  acceptCandidature(applicationId: string): void {
    this.offerService.updateOfferApplicationStatus(applicationId, 'Accepted').subscribe({
      next: (updatedApplication) => {
        console.log('Candidature acceptée :', updatedApplication);
        this.loadCandidatures(); // Recharger les candidatures après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de l\'acceptation de la candidature :', err);
      },
    });
  }

  /**
   * Refuser une candidature
   */
  rejectCandidature(applicationId: string): void {
    this.offerService.updateOfferApplicationStatus(applicationId, 'Rejected').subscribe({
      next: (updatedApplication) => {
        console.log('Candidature refusée :', updatedApplication);
        this.loadCandidatures(); // Recharger les candidatures après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors du refus de la candidature :', err);
      },
    });
  }
}