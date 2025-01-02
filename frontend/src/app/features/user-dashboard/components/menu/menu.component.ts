import { Component, Input, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, AfterViewInit {
  // @Input() menuItems: any[] = [];

  
  menuItems = [
    { 
      label: 'Tableau de bord', 
      icon: 'dashboard', route: 'dashboard' 
    },
    {
      label: 'Mes Cours',
      icon: 'menu_book',
      children: [
        { label: 'Tous les cours', route: '#' },
        { label: 'Cours commencés', route: '#' },
        { label: 'Cours terminés', route: '#' },
      ]
    },
   
    {
      label: 'Mes inscriptions Formations',
      icon: 'library_books',
      children: [
        { label: 'Prog. Talent', route: 'trainings/talent' },
        { label: 'Webinaires', route: 'trainings/webinars' },
        { label: 'Cafe des Allies', route: 'trainings/coffee' },
        { label: 'Formations externes', route: 'trainings/externes' }
      ]
    },
    {
      label: 'Mes inscriptions Recrutment',
      icon: 'work',
      children: [
        { label: 'Emplois', route: 'list/offers/jobs' },
        { label: 'Stages', route: '/internships' },
  
      ]
    },
   
    {
      label: 'Interactions',
      icon: 'chat', // ou 'notifications', ou 'comment'
      children: [
        { label: 'Notifications', route: 'interaction/notifications' },
        { label: 'Messages', route: 'interaction/messages' },
        { label: 'Mails', route: 'interaction/mails' }
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
