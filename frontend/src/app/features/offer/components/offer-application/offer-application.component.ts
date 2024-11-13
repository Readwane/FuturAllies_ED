import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferApplication } from '../../models/offer-application.model';
import { OfferService } from '../../services/offer.service';
import { ApplicationFile } from 'src/app/core/models/doc/application-file.model';
import { Offer } from '../../models/offer.model';
import { File } from 'src/app/core/models/doc/file.model';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {

  applicationForm!: FormGroup;
  offerId!: string;
  userId: string = '671cb559e6bff63f72443d9c'; // ID utilisateur à remplacer
  submittedDocuments: File[] = [];  // Liste mise à jour pour stocker les documents soumis
  today: Date = new Date();
  showLM: boolean | undefined;
  showATTEST: boolean | undefined;
  canAddOtherDocs: boolean = false;  // Pour afficher l'option d'ajouter d'autres documents
  offer!: Offer;
  mm: string = "Je suis très intéressé(e) par cette offre et je suis convaincu(e) que mes compétences et mon expérience correspondent aux attentes de votre entreprise. J'aimerais avoir l'opportunité de discuter de cette offre plus en détail et de contribuer au succès de votre équipe.";

  // Variables pour la barre de progression
  isUploadingCV: boolean = false;
  isUploadingLM: boolean = false;
  isUploadingATTEST: boolean = false;
  isUploadingOtherDocs: boolean = false;
  uploadProgress: number = 0;  // Progression de la barre de chargement (en pourcentage)

  // Variables pour stocker les noms des fichiers
  cvFileName: string = '';
  lmFileName: string = '';
  attestFileName: string = '';
  otherDocsFileName: string = '';

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id') || '';
    this.offerService.getOfferById(this.offerId).subscribe({
      next: (offer) => {
        this.offer = offer;  // Charger les informations de l'offre
        this.initializeForm();  // Initialiser le formulaire après avoir récupéré l'offre
      },
      error: (err) => {
        console.error('Erreur de récupération de l\'offre', err);
        this.snackBar.open('Erreur de récupération de l\'offre', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }

  // Initialiser le formulaire en fonction de l'offre
  initializeForm(): void {
    this.applicationForm = this.fb.group({
      offerId: [this.offerId],
      userId: [this.userId],
      applicationDate: [{ value: this.today, disabled: true }],
      message: ['', [Validators.maxLength(500)]],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Vérification des documents requis dans l'offre
    this.showLM = this.offer.isRequiredMlDoc;
    this.showATTEST = this.offer.canAddOthersDoc;
    this.canAddOtherDocs = this.offer.canAddOthersDoc;
  }

  // Méthode pour gérer les fichiers et la barre de progression
  onFileChange(event: Event, doc: string): void {
    let docType: 'CV' | 'ML' | 'ATTEST' | 'OTHER';  // Définition explicite du type
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        // Commencer le téléchargement du fichier
        if (doc === 'CV') {
          this.isUploadingCV = true;
        } else if (doc === 'LM') {
          this.isUploadingLM = true;
        } else if (doc === 'ATTEST') {
          this.isUploadingATTEST = true;
        } else if (doc === 'CERTIFICATE' || 'OTHER') {
          this.isUploadingOtherDocs = true;
        }

        // Réinitialiser la progression
        this.uploadProgress = 0;

        // Simuler le téléchargement et mise à jour de la progression
        const interval = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 10;  // Augmenter la progression de 10%
          } else {
            clearInterval(interval);  // Arrêter la progression quand elle atteint 100
            if (doc === 'CV') {
              this.isUploadingCV = false;
              this.cvFileName = file.name;  // Mettre à jour le nom du fichier pour le CV
            } else if (doc === 'LM') {
              this.isUploadingLM = false;
              this.lmFileName = file.name;  // Mettre à jour le nom du fichier pour la LM
            } else if (doc === 'ATTEST') {
              this.isUploadingATTEST = false;
              this.attestFileName = file.name;  // Mettre à jour le nom du fichier pour l'attestation
            } else if (doc === 'OTHER') {
              this.isUploadingOtherDocs = false;
              this.otherDocsFileName = file.name;  // Mettre à jour le nom du fichier pour autres
            }
          }
        }, 500);

        // Vérifier si le nom du fichier contient un terme correspondant dans docTypes
        if (file.name) {
          // Convertir le nom du fichier en majuscule pour une comparaison insensible à la casse
          const fileNameUpper = file.name.toUpperCase();

          // Vérifier si le nom du fichier correspond à l'un des types
          if (fileNameUpper.includes('CV')) {
            docType = 'CV';
          } else if (fileNameUpper.includes('ML') || fileNameUpper.includes('LETTRE') || fileNameUpper.includes('MOTIVATION')) {
            docType = 'ML';
          } else if (fileNameUpper.includes('ATTESTATION') || fileNameUpper.includes('ATTEST')) {
            docType = 'ATTEST';
          } else if (fileNameUpper.includes('CERTIFICATION') || fileNameUpper.includes('CERTIFICATE') || fileNameUpper.includes('OTHER')) {
            docType = 'OTHER';
          }
          // Ajoutez le document avec le type correspondant
          this.submittedDocuments.push(new File('', file.name, docType, '', null, new Date()));
        }
      }
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const offerApplication: OfferApplication = {
        offerId: this.applicationForm.value.offerId,
        candidatId: this.userId,
        applicationDate: new Date(),
        status: 'Pending',
        message: this.applicationForm.value.message || '',
        lastUpdated: new Date(),
        submittedDocumentsIds: []
      };

      this.offerService.createOfferApplication(offerApplication, this.submittedDocuments).subscribe({
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

  // // Méthode pour afficher l'option d'ajout d'autres documents
  // documentUpload(docType: string) {
  //   if (docType === 'CV') {
  //     this.showLM = true;  // Afficher le champ LM si le CV est téléchargé
  //     this.showATTEST = true;  // Afficher le champ pour attestation
  //   }
  // }
}
