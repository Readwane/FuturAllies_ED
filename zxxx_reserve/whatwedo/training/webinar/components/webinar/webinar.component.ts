import { Component, Input, OnInit } from '@angular/core';
import { Webinar } from '../../models/webinar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent implements OnInit {

  @Input() webinar!: Webinar; // Recevoir les données du webinaire en tant qu'entrée

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Webinaire reçu dans WebinarComponent:', this.webinar);
    console.log('Titre du webinaire reçu :', this.webinar.title);
  
    if (!this.webinar || !this.webinar._id) {
      console.error("Le webinaire n'a pas été correctement chargé ou l'ID (_id) est manquant.");
    } else {
      console.log('ID du webinaire reçu (_id) :', this.webinar._id);
    }
  }
  
  
}
