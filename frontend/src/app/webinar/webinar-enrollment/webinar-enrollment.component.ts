import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { WebinarService } from '../webinar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-webinar-enroll',
  templateUrl: './webinar-enrollment.component.html',
  styleUrls: ['./webinar-enrollment.component.css']
})
export class WebinarEnrollComponent implements OnInit {
  enrollForm!: FormGroup;
  webinarId!: string; // Passed via route or parent component

  constructor(
    private fb: FormBuilder,
    private webinarService: WebinarService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, // Remplacer ToastrService par MatSnackBar
  ) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue]
    });

     // Récupérer l'ID du webinaire depuis l'URL
    this.webinarId = this.route.snapshot.paramMap.get('id') || '';
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      const enrollData = {
        webinarId: this.webinarId,
        fullName: this.enrollForm.value.fullName,
        email: this.enrollForm.value.email
      };

      this.webinarService.enrollToWebinar(enrollData).subscribe({
        next: (response) => {
          this.snackBar.open('Inscription réussie', 'Fermer', {
            duration: 3000, // Durée en millisecondes
            verticalPosition: 'top', // Position verticale
            horizontalPosition: 'center', // Position horizontale
          });
          this.router.navigate(['/webinar-list']);
        },
        error: (err) => {
          this.snackBar.open('Échec de l\'inscription', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    }
  }
}
