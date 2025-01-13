import { Component, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, AfterViewInit {

  menuItems = [
    { 
      label: 'Tableau de bord', 
      icon: 'dashboard', 
      route: 'dashboard',
      children: [
        { label: 'Statistiques', icon: 'bar_chart', route: 'stats-offer' },
        { label: 'Dernières activités', icon: 'history', route: 'last-activities' },
      ]
    },
    {
      label: 'Gestion des offres',
      icon: 'business_center',
      children: [
        { label: 'Liste des offres', icon: 'list_alt', route: 'list-offer' },
        { label: 'Créer une offre', icon: 'post_add', route: 'create-offer' },
      ]
    },
    {
label: 'Candidatures',
      icon: 'people',
      children: [
        { label: 'Liste des candidatures', icon: 'assignment', route: 'list-candidat' },
      ]
    },
    {
      label: 'Statistiques et rapports',
      icon: 'analytics',
      children: [
        { label: 'Graphiques', icon: 'insert_chart', route: 'list/offers/jobs' },
        { label: 'Export', icon: 'file_download', route: '/internships' },
      ]
    },
    {
      label: 'Paramètres',
      icon: 'settings',
      children: [
        { label: 'Profil de l\'entreprise', icon: 'business', route: 'company-profile' },
        { label: 'Préférences de notification', icon: 'notifications', route: 'notification-settings' },
        { label: 'Gestion des utilisateurs', icon: 'group', route: 'user-management' },
        { label: 'Sécurité', icon: 'lock', route: 'security-settings' },
      ]
    },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Vous pouvez ajouter ici des initialisations supplémentaires si nécessaire
  }

  ngOnDestroy(): void {
    // Nettoyage des tooltips
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.el.nativeElement.removeChild(tooltip);
    });
  }
}