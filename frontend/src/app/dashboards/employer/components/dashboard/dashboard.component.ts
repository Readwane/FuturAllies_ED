import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { OverlayContainer } from 'ngx-toastr';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  tooltips: any[] = [];  // Liste des tooltips à gérer
  constructor(
    private overlayContainer: OverlayContainer, 
    private el: ElementRef,
  ) {}
  
  ngOnDestroy(): void {
    // Clean up any subscriptions or resources here
    this.tooltips.forEach(tooltip => {
      if (tooltip && typeof tooltip.dispose === 'function') {
        tooltip.dispose();
      }
    });
  }

  @ViewChild('sidenav') sidenav!: MatSidenav; // Référence au sidenav
// Données pour le graphique en camembert
pieChartData = [
  { name: 'Offre A', value: 120 },
  { name: 'Offre B', value: 80 },
  { name: 'Offre C', value: 60 },
  { name: 'Offre D', value: 40 },
];

// Données pour le graphique en ligne
lineChartData = [
  {
    name: 'Candidatures',
    series: [
      { name: 'Jan', value: 65 },
      { name: 'Fév', value: 59 },
      { name: 'Mar', value: 80 },
      { name: 'Avr', value: 81 },
      { name: 'Mai', value: 56 },
      { name: 'Juin', value: 55 },
      { name: 'Juil', value: 40 },
    ],
  },
];

// Schéma de couleurs
colorScheme = {
  domain: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
};
}