import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-header-navigation',
  templateUrl: './main-header-navigation.component.html',
  styleUrls: ['./main-header-navigation.component.css']
})
export class MainHeaderNavigationComponent implements OnInit {
  navLinks: NavLink[] = [];

  private routesMap: { [key: string]: NavLink[] } = {
    '/home': [
      { label: 'À propos', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Contact', path: '/contact' }
    ],
    '/services': [
      { label: 'Retour à l\'accueil', path: '/home' },
      { label: 'À propos', path: '/about' },
      { label: 'Contact', path: '/contact' }
    ],
    // Ajoutez d'autres routes et leurs liens ici
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateNavLinks();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavLinks();
      });
  }

  private updateNavLinks(): void {
    const currentRoute = this.router.url;
    this.navLinks = this.routesMap[currentRoute] || [];
  }
}
