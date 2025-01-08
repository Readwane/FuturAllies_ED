import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.model';  // Assurez-vous que le modèle User existe

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isUserLoggedIn = false;
  user: User | null = null;  // Récupérer l'utilisateur complet
  username: string = '';
  userimage: string = '';  // Image par défaut
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
        this.username = this.authService.getUserName() || '';
        this.userimage = 'assets/login_img.jpeg';  // Image de connexion par défaut
      } else {
        this.username = '';
        this.userimage = '';  // Remettre l'image de connexion par défaut
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
