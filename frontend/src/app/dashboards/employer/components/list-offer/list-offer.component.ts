import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/features/offer/models/offer.models';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { FormControl } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.models';

@Component({
  selector: 'app-offer-list',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css'],
})
export class ListOfferComponent implements OnInit, OnDestroy {
  currentUser?: User;
  offers: Offer[] = []; // Liste complète des offres
  filteredOffers: Offer[] = []; // Offres filtrées selon le statut et les filtres
  loading: boolean = true; // Indicateur de chargement
  status: string | null = null; // Statut récupéré depuis l'URL
  displayedColumns: string[] = ['title', 'type', 'location', 'expirationDate', 'actions']; // Colonnes à afficher

  // Filtres
  searchControl = new FormControl(''); // Barre de recherche par titre
  typeFilterControl = new FormControl('all'); // Filtre par type d'offre

  // Pagination
  pageSize = 10; // Nombre d'éléments par page
  pageIndex = 0; // Index de la page actuelle
  totalOffers = 0; // Nombre total d'offres

  // Abonnements pour éviter les fuites de mémoire
  private routeSubscription: Subscription | undefined;
  private searchSubscription: Subscription | undefined;
  private typeFilterSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private route: ActivatedRoute, // Pour récupérer le statut depuis l'URL
    private router: Router // Pour naviguer vers les candidatures
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.currentUser = user;
      console.log('offerCreatorId:', this.currentUser._id);
    }

    // Récupérer le statut depuis l'URL
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.status = params.get('status'); // Récupère le paramètre 'status' de l'URL
      this.getOffers(); // Charge les offres en fonction du statut
    });

    // Réagir aux changements de la barre de recherche et du filtre par type
    this.searchSubscription = this.searchControl.valueChanges.subscribe(() =>
      this.applyFilters()
    );
    this.typeFilterSubscription = this.typeFilterControl.valueChanges.subscribe(
      () => this.applyFilters()
    );
  }

  ngOnDestroy(): void {
    // Nettoyer les abonnements pour éviter les fuites de mémoire
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.typeFilterSubscription) {
      this.typeFilterSubscription.unsubscribe();
    }
  }

  /**
   * Récupère les offres depuis le service
   */
  getOffers(): void {
    this.loading = true;
    const userId = this.currentUser?._id;
    console.log("UserId:", userId);
    if (userId) {
      this.offerService.getOffersByUser(userId)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la récupération des offres', error);
            this.loading = false;
            return of([]); // Retourne un tableau vide en cas d'erreur
          })
        )
        .subscribe((data: Offer[]) => {
          this.offers = data;
          this.totalOffers = data.length; // Mettre à jour le nombre total d'offres
          console.log('Nombre d\'offres récupérés:', this.totalOffers);
          this.applyFilters(); // Applique les filtres après chargement
          this.loading = false;
        });
    } else {
      console.error('User ID is undefined');
      this.loading = false;
    }
  }

  /**
   * Applique les filtres (statut, type et recherche)
   */
  applyFilters(): void {
    let filtered = this.offers;

    // Filtre par statut
    if (this.status) {
      filtered = filtered.filter((offer) => offer.status === this.status);
    }

    // Filtre par type d'offre
    const typeFilter = this.typeFilterControl.value;
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter((offer) => offer.type === typeFilter);
    }

    // Filtre par titre (recherche)
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter((offer) =>
        offer.topic.toLowerCase().includes(searchTerm)
      );
    }

    this.totalOffers = filtered.length; // Mettre à jour le nombre total d'offres filtrées
    this.filteredOffers = filtered.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    ); // Appliquer la pagination
  }

  /**
   * Gère le changement de page pour la pagination
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters(); // Re-appliquer les filtres avec la nouvelle pagination
  }

  /**
   * Redirige vers la liste des candidatures pour une offre spécifique
   */
  viewCandidatures(offerId: string): void {
    this.router.navigate([`dashboards/emp/list/candidats/${offerId}`]);
  }

  /**
   * Redirige vers les détails d'une offre
   */
  viewDetails(offerId: string): void {
    this.router.navigate([`/dashboards/dashboard/details/${offerId}`]);
  }

  /**
   * Redirige vers la modification d'une offre si le statut est "Pending"
   */
  editOffer(offerId: string): void {
    this.router.navigate([`/dashboards/emp/edit/${offerId}`]);
  }

  /**
   * Redirige vers la création d'une offre
   */
  createOffer(): void {
    this.router.navigate(['dashboards/emp/create/indefinie']);
  }
}