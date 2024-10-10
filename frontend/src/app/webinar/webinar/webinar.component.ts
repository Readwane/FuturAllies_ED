import { Component, Input } from '@angular/core';
import { Webinar } from '../models/webinar.model';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent {
  @Input() webinar!: Webinar; // Recevoir les données du webinaire en tant qu'entrée
}
