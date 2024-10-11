import { Component } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent {
  // Liens pour le menu 'À propos' et 'Nous contacter'
  aboutLink = { label: 'À propos de nous', url: '/about', icon_url: '' };
  contactLink = { label: 'Nous contacter', url: '/contact', icon_url: '' };

  // Liste des options de langue pour le dropdown
  languageOptions: string[] = ['Français', 'English'];

  // Langue sélectionnée
  selectedLanguage: string = 'Français';  // Valeur par défaut
}
