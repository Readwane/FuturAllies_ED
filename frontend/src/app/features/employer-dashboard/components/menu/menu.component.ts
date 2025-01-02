import { Component, Input, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, AfterViewInit {

  menuItems = [
    { 
      label: 'Tableau de bord', 
      icon: 'dashboard', route: 'dashboard' 
    },
    {
      label: 'Mes offres d\'emploi',
      icon: 'work',
      children: [
        { label: 'offres actifs', route: 'create' },
        { label: 'offres programmés', route: '/internships' },
        { label: 'offres expirés', route: 'list/offers/jobs' },
  
      ]
    },

    {
      label: 'Mes offres de stage',
      icon: 'work',
      children: [
        { label: 'offres actifs', route: 'list/offers/jobs' },
        { label: 'offres programmés', route: '/internships' },
        { label: 'offres expirés', route: 'list/offers/jobs' },
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
