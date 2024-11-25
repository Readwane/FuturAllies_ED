import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-generic-details',
  templateUrl: './generic-details.component.html',
  styleUrls: ['./generic-details.component.css'],
})
export class GenericDetailsComponent implements OnDestroy {
  @Input() data: any; // Les données à afficher
  @Input() fieldsConfig: {
    name: string;
    label: string;
    type: string; // "text", "image", "date", "email", etc.
  }[] = [];
  @Input() actions: {
    name: string;
    label: string;
    icon?: string;
    callback: () => void;
  }[] = [];
  @Input() cssClasses: { container?: string; field?: string; button?: string } = {};

  @Output() actionEvent = new EventEmitter<string>(); // Événement pour les actions

  ngOnDestroy() {
    // Code de nettoyage
    this.cleanUp();
  }

  private cleanUp() {
    // Ajoutez ici le code de nettoyage nécessaire
    // Par exemple, si vous avez des abonnements ou des éléments DOM à nettoyer
    console.log('Nettoyage des ressources');
  }
}
