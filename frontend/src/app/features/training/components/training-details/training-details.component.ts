// training-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})

export class TrainingDetailsComponent implements OnInit {
  training!: Training;
  trainingId!: string;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.getTrainingDetails();
  }

  getTrainingDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID de la formation récupéré :', id);
    if (id) {
      this.trainingId = id;
      this.loading = true;
      this.trainingService.getTrainingById(id).subscribe(
        (data: Training) => {
          this.training = data;
          this.loading = false;
        },
        error => {
          console.error('Erreur lors de la récupération des détails de la formation', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Aucun ID de formation fourni.');
    }
  }

  register(): void {
    this.router.navigate(['/trainings/application', this.trainingId]);
  }
}
