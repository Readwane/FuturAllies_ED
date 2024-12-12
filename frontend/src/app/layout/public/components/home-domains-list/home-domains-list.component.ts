// components/home-domains-list/home-domains-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/features/audition/models/domain.model';
import { DomainService } from 'src/app/features/audition/services/domain.service';

@Component({
  selector: 'app-home-domains-list',
  templateUrl: './home-domains-list.component.html',
  styleUrls: ['./home-domains-list.component.css']
})
export class HomeDomainsListComponent implements OnInit {
  domains: Domain[] = [];  // Liste des domaines récupérés
  displayedDomains: Domain[] = [];  // Liste des domaines affichés
  isLoading = false;        // Pour afficher un loader pendant la récupération des données
  errorMessage: string | null = null; // Pour afficher un message d'erreur en cas de problème
  isAllDomainsVisible = false; // Flag pour contrôler l'affichage de tous les domaines

  constructor(private domainService: DomainService) {}

  ngOnInit(): void {
    this.loadDomains();
  }

  loadDomains(): void {
    this.isLoading = true; // Lancement du chargement
    this.domainService.getDomains().subscribe(
      (data: Domain[]) => {
        this.domains = data;
        this.displayedDomains = data.slice(0, 8); // Affichage des 8 premiers domaines
        this.isLoading = false; // Fin du chargement
      },
      (error) => {
        console.error('Erreur lors du chargement des domaines:', error);
        this.isLoading = false; // Fin du chargement
        this.errorMessage = 'Une erreur est survenue lors du chargement des domaines. Veuillez réessayer.';
      }
    );
  }

  // Afficher tous les domaines
  showAllDomains(): void {
    this.isAllDomainsVisible = true;
    this.displayedDomains = this.domains;
  }

  // Réduire l'affichage des domaines
  reduceDomains(): void {
    this.isAllDomainsVisible = false;
    this.displayedDomains = this.domains.slice(0, 8); // Afficher uniquement les 8 premiers domaines
  }
}
