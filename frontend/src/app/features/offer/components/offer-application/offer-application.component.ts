import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../../services/offer.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour les notifications de barre de message
import { ActivatedRoute, Router } from '@angular/router'; // Pour récupérer les paramètres de la route
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css'],
})
export class OfferApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  offerId!: string;  // ID de l'offre obtenue de la route
  userId: string = '671cb559e6bff63f72443d9c'; // Remplacez par l'ID utilisateur réel
  offer!: Offer;
  cvFile?: File;
  lmFile?: File;
  otherFiles: File[] = []; // Stocke d'autres fichiers

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private offerApplicationService: OfferService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id') || '';
    console.log(`Log: (Id oofre: ${this.offerId})`)
    if (!this.offerId) {
      this.snackBar.open('ID de l\'offre manquant.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    this.initializeForm();
  }

  // Initialisation du formulaire
  initializeForm(): void {
    this.applicationForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  // Gestion des fichiers
  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      switch (type) {
        case 'CV':
          this.cvFile = file;
          break;
        case 'LM':
          this.lmFile = file;
          break;
        case 'OTHER':
          this.otherFiles.push(file);
          break;
        default:
          console.warn('Type de fichier inconnu:', type);
      }
    }
  }

  // Envoi du formulaire
  onSubmit(): void {
    if (this.applicationForm.invalid || !this.cvFile || !this.lmFile) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires et télécharger les fichiers nécessaires.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    // Créer une instance de OfferApplication avec tous les champs requis
    const offerApplication = {
      offerId: this.offerId,
      candidatId: this.userId,
      message: this.applicationForm.value.message,
      applicationDate: new Date(), // Date actuelle
      status: 'Pending', // Statut initial
      lastUpdated: new Date(),  // Date de dernière mise à jour (initiale)
      submittedDocumentsIds: [] // Initialisé à une liste vide
    };

    // Ajouter les fichiers
    const files: File[] = [this.cvFile, this.lmFile, ...this.otherFiles];

    console.log(`Données de candidature: `, files, offerApplication)
    // Appel du service pour soumettre la candidature
    this.offerApplicationService.createOfferApplication(offerApplication, files).subscribe({
      next: (response) => {
        this.snackBar.open('Candidature soumise avec succès !', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['/offers']);
      },
      error: (err) => {
        console.error('Erreur lors de la soumission de la candidature:', err);
        this.snackBar.open('Erreur lors de la soumission de la candidature.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
