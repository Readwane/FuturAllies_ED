import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  @ViewChild('sidenav') sidenav: any;
  tooltips: any[] = [];  // Liste des tooltips à gérer

  user = {
    isLoggedIn: true,
    avatarUrl: '',
    name: 'Tegawende',
    notifications: 5,
    messages: 3
  };

  constructor(private overlayContainer: OverlayContainer, private el: ElementRef) {}


  menuItems = [
    { label: 'Tableau de bord', icon: 'dashboard', route: 'dashboard' },
    {
      label: 'Utilisateurs',
      icon: 'people',
      children: [
        { label: 'Étudiants', route: 'users/students' },
        { label: 'Formateurs', route: 'users/trainers' },
        { label: 'Entreprises', route: 'users/enterprises' },
        { label: 'Administrateurs', route: 'users/admins' },
      ]

    },
    {
      label: 'Écoles',
      icon: 'school',
      children: [
        { label: 'Universités', route: '/universities' },
        { label: 'Instituts', route: '/institutes' },
        { label: 'Centres de formations', route: '/training-centers' }
      ]
    },
    {
      label: 'Cours',
      icon: 'menu_book',
      children: [
        { label: 'Domaines', route: '/domains' },
        { label: 'Parcours de formations', route: '/training-paths' },
        { label: 'Cours libres', route: '/free-courses' },
        { label: 'Cours payants', route: '/paid-courses' }
      ]
    },
    {
      label: 'Certifications',
      icon: 'verified',
      children: [
        { label: 'Organismes de certifications', route: '/certification-bodies' },
        { label: 'Certifications disponibles', route: '/available-certifications' },
        { label: 'Certifications délivrées', route: '/issued-certifications' }
      ]
    },
    {
      label: 'Offres',
      icon: 'work',
      children: [
        { label: 'Emplois', route: '/jobs' },
        { label: 'Stages', route: '/internships' }
      ]
    },
    {
      label: 'Paramètres',
      icon: 'settings',
      children: [
        { label: 'Thèmes', route: '/themes' },
        { label: 'Apparence', route: '/appearance' },
        { label: 'Politique d’utilisation', route: '/policy' }
      ]
    }
  ];

  ngAfterViewInit(): void {
    // Vous pouvez ajouter ici des tooltips ou autres fonctionnalités interactives si nécessaire.
  }

  ngOnDestroy(): void {
    // Masquer et nettoyer les tooltips
    this.tooltips.forEach(tooltip => tooltip.hide(0));

    // Nettoyer les overlays s'ils existent
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    overlayContainerElement.innerHTML = '';

    // Nettoyer le DOM des tooltips (si nécessaire)
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.el.nativeElement.removeChild(tooltip);
    });
  }
}