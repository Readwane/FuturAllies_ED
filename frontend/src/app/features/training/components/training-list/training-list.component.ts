import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.models';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  loading: boolean = true;
  filterType: string = 'all'; // Type de filtre par défaut

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings(): void {
    this.loading = true;
    this.trainingService.getTrainings().subscribe(
      (data: Training[]) => {
        this.trainings = data;
        this.applyFilter(); // Appliquer le filtre après chargement
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des formations', error);
        this.loading = false;
      }
    );
  }

  setFilter(type: string): void {
    this.filterType = type;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterType === 'all') {
      this.filteredTrainings = this.trainings;
    } else {
      this.filteredTrainings = this.trainings.filter(
        training => training.type === this.filterType
      );
    }
  }
}
