import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferApplication } from '../../models/offer-application.model';
import { RecruitmentService } from '../../services/recruitment.service';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  offerId!: string;
  userId: string = '671cb559e6bff63f72443d9c'; // ID utilisateur à remplacer
isMessageExpanded: any;

  constructor(
    private fb: FormBuilder,
    private recruitmentService: RecruitmentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.maxLength(500)], // Message de motivation
      requiredDocuments: ['', Validators.required], // Documents requis (ex: CV, lettre de motivation)
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.offerId = this.route.snapshot.paramMap.get('id') || '';
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const offerApplication: Omit<OfferApplication, 'id'> = {
        offerId: this.offerId,
        userId: this.userId,
        applicationDate: new Date(),
        requiredDocuments: this.applicationForm.value.requiredDocuments,
        status: 'Pending',
        submittedDocuments: {}, // À remplir avec les documents téléversés si nécessaire
        message: this.applicationForm.value.message || '',
        lastUpdated: new Date()
      };

      this.recruitmentService.createOfferApplication(offerApplication).subscribe({
        next: (response) => {
          this.snackBar.open('Candidature soumise avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/offers']);
        },
        error: (err) => {
          console.error('Erreur lors de la soumission de la candidature', err);
          this.snackBar.open('Erreur lors de la soumission de la candidature', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    } else {
      console.warn('Formulaire invalide', this.applicationForm.errors);
    }
  }
}
