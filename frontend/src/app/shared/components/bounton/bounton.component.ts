import { Component, Input } from '@angular/core';
import { Bounton } from '../../models/bounton.model';

@Component({
  selector: 'app-bounton',
  templateUrl: './bounton.component.html',
  styleUrls: ['./bounton.component.css']
})
export class BountonComponent {
  @Input() bounton!: Bounton;

  onClick() {
    console.log(`${this.bounton.label} button clicked`);
    // Ajouter ici la logique pour les actions du bouton
  }
}
