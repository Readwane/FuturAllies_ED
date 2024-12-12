import { Component } from '@angular/core';
interface User {
  name: string;
  image: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isUserLoggedIn = false;
  user: User | null = null; 
  isDropdownOpen: { [key: string]: boolean } = {};

  // Méthodes de gestion de la connexion/déconnexion
  login() {
    this.isUserLoggedIn = true;
    this.user = { name: 'Jean Dupont', image: '' };
  }

  logout() {
    this.isUserLoggedIn = false;
    this.user = null;
  }

  toggleDropdown(dropdown: string) {
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
  }

  openDropdown(dropdown: string) {
    this.isDropdownOpen[dropdown] = true;
  }

  closeDropdown(dropdown: string) {
    this.isDropdownOpen[dropdown] = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
