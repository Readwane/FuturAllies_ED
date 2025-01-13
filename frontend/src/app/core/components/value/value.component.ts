import { Component, Input } from '@angular/core';
import { Value } from '../../models/value.models';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent {
  @Input() value: Value | undefined; // Réception de l'objet 'Value'
}
