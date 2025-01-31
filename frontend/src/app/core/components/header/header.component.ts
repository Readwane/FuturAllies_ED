import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isUserLoggedIn = false;

  defaultUserImage = 'assets/images/avatar.jpeg';  // Image par défaut
  user: User | null = null;  // Récupérer l'utilisateur complet
  userGroups: string[] = [];  // Récupérer les groupes de l'utilisateur

  isDropdownOpen: { [key: string]: boolean } = {  // Etat de chaque menu déroulant
    catalogue: false,
    formations: false,
    offres: false,
    orientation: false
  };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // S'abonner à l'état de connexion pour mettre à jour l'interface utilisateur
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isUserLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.user = this.authService.getUser();  // Récupérer l'utilisateur complet
        if (this.user) {
          // Récupérer l'image de l'utilisateur ou image par défaut si non définie
          this.user.image = this.user.image ?? this.defaultUserImage;
          this.userGroups = this.authService.getUserGroups();  // Récupérer les groupes de l'utilisateur
        }
      } else {
        this.user = null;
        this.userGroups = [];
      }
    });
  }

  login() {
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openDropdown(menu: string) {
    this.isDropdownOpen[menu] = true;
  }

  closeDropdown(menu: string) {
    this.isDropdownOpen[menu] = false;
  }
}
