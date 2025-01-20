import { Component, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route?: string; // Facultatif, car certains éléments n'ont pas de route
  children?: MenuItem[]; // Facultatif, car certains éléments n'ont pas d'enfants
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, AfterViewInit {

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

  menuItems: MenuItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'dashboard',
      children: [
        { label: 'Statistiques', icon: 'bar_chart', route: 'dashboard' },
        { label: 'Dernières activités', icon: 'history', route: 'last-activities' },
      ],
    },
    {
      label: 'Gestion des offres',
      icon: 'business_center',
      children: [
        { label: 'Offres en cours', icon: 'hourglass_top', route: 'list/offers/Open' },
        { label: 'Offres en attente', icon: 'hourglass_empty', route: 'list/offers/Pending' },
        { label: 'Offres fermées', icon: 'lock', route: 'list/offers/Closed' },
        { label: 'Créer une offre', icon: 'post_add', route: 'create/offer' },
      ],
    },
    {
      label: 'Candidatures',
      icon: 'people',
      children: [
        { label: 'En attente', icon: 'hourglass_empty', route: 'list/candidats/Pending' },
        { label: 'Acceptées', icon: 'check_circle', route: 'list/candidats/Accepted' },
        { label: 'Refusées', icon: 'highlight_off', route: 'list/candidats/Rejected' },
      ],
    },
    {
      label: 'Statistiques et rapports',
      icon: 'analytics',
      children: [
        { label: 'Graphiques', icon: 'insert_chart', route: 'reports/charts' },
        { label: 'Performances des offres', icon: 'trending_up', route: 'reports/performance' },
        { label: 'Export', icon: 'file_download', route: 'reports/export' },
      ],
    },
    {
      label: 'Paramètres',
      icon: 'settings',
      children: [
        { label: 'Profil de l\'entreprise', icon: 'business', route: 'settings/company-profile' },
        { label: 'Préférences de notification', icon: 'notifications', route: 'settings/notifications' },
        { label: 'Gestion des utilisateurs', icon: 'group', route: 'settings/user-management' },
        { label: 'Sécurité', icon: 'lock', route: 'settings/security' },
        { label: 'Historique des modifications', icon: 'history', route: 'settings/audit-log' },
      ],
    },
  ];

}