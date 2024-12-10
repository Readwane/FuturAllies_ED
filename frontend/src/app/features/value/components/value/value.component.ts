import { Component, Input } from '@angular/core';
import { Value } from '../../models/value.model';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrl: './value.component.css'
})
export class ValueComponent {
  @Input() value: Value | undefined; // Nous recevons un objet de type 'Value' en entrée

}
