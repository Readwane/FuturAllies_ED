import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { ActivatedRoute, Router } from '@angular/router';  
import { MatSnackBar } from '@angular/material/snack-bar';  
import { OfferApplication } from '../../models/offer-application.model';  
import { RecruitmentService } from '../../services/recruitment.service';  
import { Doc } from 'src/app/features/user/models/doc.model';  

@Component({  
  selector: 'app-offer-application',  
  templateUrl: './offer-application.component.html',  
  styleUrls: ['./offer-application.component.css']  
})  
export class OfferApplicationComponent implements OnInit {

  applicationForm!: FormGroup;  
  offerId!: string;  
  userId: string = '671cb559e6bff63f72443d9c'; // ID utilisateur à remplacer  
  submittedDocuments: Doc[] = []; // Pour stocker les documents soumis au format approprié  
  today: Date = new Date();  
  showLM: boolean | undefined;
  showATTEST: boolean | undefined;

  constructor(  
    private fb: FormBuilder,  
    private recruitmentService: RecruitmentService,  
    private router: Router,  
    private route: ActivatedRoute,  
    private snackBar: MatSnackBar  
  ) {}  

  ngOnInit(): void {  
    this.offerId = this.route.snapshot.paramMap.get('id') || '';  
    this.applicationForm = this.fb.group({  
      offerId: [this.offerId], // Ajout de l'ID de l'offre dans le formulaire  
      userId: [this.userId],   // Ajout de l'ID de l'utilisateur dans le formulaire  
      applicationDate: [{ value: this.today, disabled: true }], // Date de la candidature  
      message: ['', [Validators.maxLength(500)]], // Message de motivation  
      acceptTerms: [false, Validators.requiredTrue] // Acceptation des termes  
    });  
  }  

  onFileChange(event: Event): void {  
    const input = event.target as HTMLInputElement;  
    if (input.files) {  
      const files = Array.from(input.files);  
      this.submittedDocuments = files.map(file => {  
        const type = this.getFileType(file.type); // Méthode pour définir le type selon votre logique  

        return new Doc(  
          '', // Laissez l'ID vide ; MongoDB s'en occupera lors de l'enregistrement  
          this.userId, // ID de l'utilisateur pour associer le document  
          file.name, // Utilisez le nom de fichier comme titre  
          type, // Type de document défini précédemment  
          '', // gridfs_id sera défini après l'enregistrement  
        );  
      });  
    }  
  }  

  // Méthode pour déterminer le type de document  
  getFileType(fileType: string): 'CV' | 'MotivationLetter' | 'Certificate' | 'Other' {  
    if (fileType.includes('pdf')) {  
      return 'CV'; // Cela peut être personnalisé selon votre logique  
    } else if (fileType.includes('msword') || fileType.includes('word')) {  
      return 'MotivationLetter';  
    } else if (fileType.includes('image')) {  
      return 'Certificate';  
    } else {  
      return 'Other';  
    }  
  }  

  onSubmit(): void {  
    if (this.applicationForm.valid) {  
      const offerApplication: OfferApplication = {
        offerId: this.applicationForm.value.offerId,
        userId: this.userId,
        applicationDate: new Date(),
        submittedDocuments: this.submittedDocuments, // Récupérer les documents soumis  
        status: 'Pending', // Définir le statut  
        message: this.applicationForm.value.message || '',
        lastUpdated: new Date() // Mettre à jour la date de dernière modification  
        ,
        updateStatus: function (newStatus: 'Pending' | 'Accepted' | 'Rejected' | 'In Review'): void {
          throw new Error('Function not implemented.');
        },
        addSubmittedDocument: function (document: Doc): void {
          throw new Error('Function not implemented.');
        }
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


  onFileSelected(event: Event, docType: string) {  
    const input = event.target as HTMLInputElement;  
    if (input.files && input.files.length > 0) {  
        const file = input.files[0];  
        
        // Vérifiez si le fichier est défini  
        if (file) {  
            this.submittedDocuments.push({
              type: 'CV', // Utiliser 'docType' plutôt que 'CV' pour la flexibilité  
              title: file.name,
              userId: '',
              _id: '',
              gridfs_id: '',
            });  
        } else {  
            console.error('Aucun fichier sélectionné.');  
        }  
    } else {  
        console.error('Aucun fichier trouvé dans l\'input.');  
    }  
}

documentUpload(docType: string) {  
  if (docType === 'CV') {  
      // Afficher les documents LM et ATTEST  
      this.showLM = true;  
      this.showATTEST = true;  
  }  
}
}