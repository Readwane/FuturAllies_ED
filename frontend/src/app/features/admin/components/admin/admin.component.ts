// app/admin/admin.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  // standalone: true,
  // imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  user = {
    isLoggedIn: true, // Définit si l'utilisateur est connecté
    avatarUrl: '',    // L'URL de l'avatar. Vide signifie qu'un avatar par défaut sera affiché
    name: 'Utilisateur' // Nom d'affichage de l'utilisateur
  };

  // Méthode pour gérer la déconnexion
  logout() {
    console.log('Utilisateur déconnecté');
    this.user.isLoggedIn = false;
    this.user.avatarUrl = '';
    this.user.name = 'Utilisateur';
  }
}



