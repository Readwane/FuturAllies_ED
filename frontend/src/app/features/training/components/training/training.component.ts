import { Component, Input, OnInit } from '@angular/core';
import { Training } from '../../models/training.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  @Input() training!: Training; // Reçoit les données de la formation en tant qu'entrée

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Formation reçue dans TrainingComponent:', this.training);
    console.log('Titre de la formation reçu :', this.training.title);
  
    if (!this.training || !this.training._id) {
      console.error("La formation n'a pas été correctement chargée ou l'ID (_id) est manquant.");
    } else {
      console.log('ID de la formation reçu (_id) :', this.training._id);
    }
  }
}
