import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  isMenuOpen: boolean = false;
  isUserLoggedIn: boolean = false; // Indicateur de connexion
  user: { name: string, image: string } | null = null; // Informations utilisateur
  isDropdownOpen: { [key: string]: boolean } = {}; // Pour gérer l'état d'ouverture de chaque dropdown

  // Méthode de connexion (par exemple)
  login() {
    // Logique pour connecter l'utilisateur (ex : appel API)
    this.isUserLoggedIn = true;
    this.user = { name: 'Jean Dupont', image: '' };
  }

  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.isUserLoggedIn = false;
    this.user = null;
  }

  // Fonction pour gérer l'ouverture/fermeture du menu mobile
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuContainer = document.querySelector('.nav-links-container');
    if (menuContainer) {
      if (this.isMenuOpen) {
        menuContainer.classList.add('open');
      } else {
        menuContainer.classList.remove('open');
      }
    }
  }

  // Méthode pour toggler l'ouverture des dropdowns
  toggleDropdown(dropdown: string) {
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
  }
}
