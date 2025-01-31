import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { MatTableDataSource } from '@angular/material/table';
import { OfferApplication } from 'src/app/features/offer/models/offer.models';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { User } from 'src/app/core/models/user.models';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.css'],
})
export class CandidatListComponent implements OnInit {
  displayedColumns: string[] = ['candidateName', 'date', 'submittedDocs', 'status', 'actions'];
  dataSource = new MatTableDataSource<OfferApplication>();
  filterValue: string = '';
  selectedStatus: string = 'all';  
  offerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('offerId');
    if (this.offerId) {
      this.loadCandidatures();
    } else {
      console.error('Offer ID is missing.');
    }
  }

  loadCandidatures(): void {
    if (this.offerId) {
      this.offerService.getOfferApplicationsByOfferId(this.offerId).subscribe({
        next: (candidatures) => {
          this.dataSource.data = candidatures;  // Mettre à jour les données du tableau
        },
        error: (err) => {
          console.error('Error loading applications:', err);
        },
      });
    }
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data: OfferApplication, filter: string) => {
      const filterString = filter.toLowerCase();
      const matchesStatus = this.selectedStatus === 'all' || data.status.toLowerCase() === this.selectedStatus.toLowerCase();
      return matchesStatus;
    };
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

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

  acceptCandidature(application: OfferApplication): void {
    this.offerService.updateOfferApplicationStatus(application._id, 'Accepted').subscribe({
      next: (updatedApplication) => {
        this.snackBar.open('Candidature acceptée !', 'Fermer', { duration: 3000 });
        
        // Mise à jour manuelle du tableau au lieu de recharger complètement
        const index = this.dataSource.data.findIndex(app => app._id === application._id);
        if (index !== -1) {
          this.dataSource.data[index].status = 'Accepted';  // Mise à jour du statut dans le tableau
          this.dataSource._updateChangeSubscription();  // Forcer l'actualisation du tableau
        }
      },
      error: (err) => {
        console.error('Error accepting application:', err);
        this.snackBar.open('Erreur lors de l\'acceptation de la candidature', 'Fermer', { duration: 3000 });
      },
    });
  }

  rejectCandidature(application: OfferApplication): void {
    this.offerService.updateOfferApplicationStatus(application._id, 'Rejected').subscribe({
      next: (updatedApplication) => {
        this.snackBar.open('Candidature refusée !', 'Fermer', { duration: 3000 });
        
        // Mise à jour manuelle du tableau au lieu de recharger complètement
        const index = this.dataSource.data.findIndex(app => app._id === application._id);
        if (index !== -1) {
          this.dataSource.data[index].status = 'Rejected';  // Mise à jour du statut dans le tableau
          this.dataSource._updateChangeSubscription();  // Forcer l'actualisation du tableau
        }
      },
      error: (err) => {
        console.error('Error rejecting application:', err);
        this.snackBar.open('Erreur lors du refus de la candidature', 'Fermer', { duration: 3000 });
      },
    });
  }
}
