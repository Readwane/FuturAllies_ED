// components/domain/domain.component.ts

import { Component, Input } from '@angular/core';
import { Domain } from '../../models/domain.model';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent {
  @Input() domain: Domain | undefined; // Réception de l'objet 'Domain'
}
