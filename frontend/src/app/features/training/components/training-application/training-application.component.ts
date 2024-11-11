import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainingApplicationService } from '../../services/application/training-application.service';
import { TrainingApplication } from '../../models/training-application.model';
import { ApplicationStatus } from '../../models/training-application.model'; // Importez l'énumération ApplicationStatus

@Component({
  selector: 'app-training-application',
  templateUrl: './training-application.component.html',
  styleUrls: ['./training-application.component.css']
})
export class TrainingApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  trainingId!: string;
  userId: string = '671cb559e6bff63f72443d9c'; // Remplacer par l'ID utilisateur réel

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required], // Ajout de fullName avec un validateur requis
      email: ['', [Validators.required, Validators.email]], // Ajout de email avec validateur requis et email
      acceptTerms: [false, Validators.requiredTrue]
    });

    console.log('Form initialized', this.applicationForm.value); // Debug: afficher l'état initial du formulaire

    this.trainingId = this.route.snapshot.paramMap.get('id') || '';
  }

  onSubmit(): void {
    console.log('Form submission attempt', this.applicationForm.value); // Debug: afficher l'état du formulaire à la soumission

    if (this.applicationForm.valid) {
      const trainingApplication: Omit<TrainingApplication, 'id'> = {
        trainingId: this.trainingId,
        userId: this.userId,
        enrollmentDate: new Date(),
        status: ApplicationStatus.Pending, // Utilisation de l'énumération ApplicationStatus
      };

      this.trainingService.createTrainingApplication(trainingApplication).subscribe({
        next: (response) => {
          console.log('Application success', response); // Debug: confirmation de succès
          this.snackBar.open('Application réussie', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/trainings']);
        },
        error: (err) => {
          console.error('Application error', err); // Debug: afficher l'erreur
          this.snackBar.open('Échec de l\'application', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    } else {
      console.warn('Form is invalid', this.applicationForm.errors); // Debug: formulaire non valide
    }
  }
}
