import { Component, Input, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.css']
})
export class DynamicMenuComponent implements OnDestroy, AfterViewInit {
  
  constructor(private el: ElementRef) {}

  
  // Définition des éléments du menu
 menuItems = [
  { 
    label: 'Tableau de bord', 
    icon: 'dashboard', 
    route: 'dashboard' 
  },
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
