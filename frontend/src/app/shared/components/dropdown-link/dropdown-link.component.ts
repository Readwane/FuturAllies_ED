import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrls: ['./dropdown-link.component.css']
})
export class DropdownLinkComponent {
  @Input() label!: string;          // Le label du dropdown
  @Input() options!: string[];      // Les options qui sont un tableau de chaînes de caractères
  @Input() selectedOption!: string; // La valeur sélectionnée
}
