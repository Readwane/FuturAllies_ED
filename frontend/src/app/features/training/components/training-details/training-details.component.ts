// training-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.models';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  training!: Training;
  trainingId!: string;
  trainers: any[] = [];
  modules: any[] = [];
  sessions: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.trainingId = this.route.snapshot.paramMap.get('id') || '';
    if (this.trainingId) {
      this.getTrainingDetails();
      this.getTrainingModules();
      this.getAllModuleSessions();
    } else {
      console.error('Aucun ID de formation fourni.');
    }
  }

  getTrainingDetails(): void {
    this.loading = true;
    this.trainingService.getTrainingById(this.trainingId).subscribe(
      (data: Training) => {
        this.training = data;
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des détails de la formation', error);
        this.loading = false;
      }
    );
  }


  getTrainingModules(): void {
    this.trainingService.getTrainingModuleById(this.trainingId).subscribe(
      (data: any[]) => {
        this.modules = data;
      },
      error => {
        console.error('Erreur lors de la récupération des modules de la formation', error);
      }
    );
  }

  getAllModuleSessions(): void {
    this.trainingService.getTrainingSessionById(this.trainingId).subscribe(
      (data: any[]) => {
        this.sessions = data;
      },
      error => {
        console.error('Erreur lors de la récupération des séances des modules', error);
      }
    );
  }

  // Nouvelle méthode pour obtenir les sessions d'un module
  getSessionsForModule(moduleId: string): any[] {
    return this.sessions.filter(session => session.moduleId === moduleId);
  }

  register(): void {
    this.router.navigate(['/trainings/application', this.trainingId]);
  }
}
