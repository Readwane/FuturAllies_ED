import { Component, Input } from '@angular/core';
import { SimpleLink } from '../../models/simple-link.model';

@Component({
  selector: 'app-simple-link',
  templateUrl: './simple-link.component.html',
  styleUrls: ['./simple-link.component.css']
})
export class SimpleLinkComponent {
  @Input() link!: SimpleLink;
}
