import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterpriseService } from 'src/app/features/offer/services/enterprise.service';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { Enterprise } from 'src/app/core/models/user/enterprise.model';
import { Offer } from 'src/app/features/offer/models/offer.model';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  offerForm: FormGroup;
  isLoading = false;
  isJob = false;
  isInternship = false;
  isCDD = false;
  enterprises: any[] = [];
  filteredEnterprises: any[] = [];

  constructor(
    private enterpriseService: EnterpriseService,
    private offerService: OfferService,
    private fb: FormBuilder
  ) {
    this.offerForm = this.fb.group({
      // Infos de l'entreprise
      type: ['', Validators.required],
      enterpriseName: ['', Validators.required],
      enterpriseLocation: ['', Validators.required],
      enterpriseWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      
      // Infos générales de l'offre
      title: ['', Validators.required],
      domain: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      requirement: ['', Validators.required],
      responsabilities: ['', Validators.required],
      recruitmentEmail: ['', [Validators.required, Validators.email]],

      // Status de l'offre
      status: ['', Validators.required],
      isRemote: [false],
      applicationMode: ['', Validators.required],
      expirationDate: ['', Validators.required], // Ajout de l'expiration
      isRequiredCvDoc: [true], // Ajout des cases à cocher
      isRequiredMlDoc: [false],
      canAddOthersDoc: [false],

      contratType: ['', Validators.required],
      salary: [null, Validators.min(0)],
      experienceLevel: ['', Validators.required],
      duration: [null, [Validators.min(1), Validators.max(12)]],
    });    
  }

  ngOnInit(): void {
    this.enterpriseService.getEnterprises().subscribe((data: any[]) => {
      this.enterprises = data;
    });
  }

  onTypeChange(type: string): void {
    this.isJob = type === 'Job';
    this.isInternship = type === 'Internship';
    this.isCDD = false; // reset pour autres types d'offres
  
    if (this.isJob) {
      this.setValidators('salary', [Validators.required, Validators.min(0)]);
      this.setValidators('experienceLevel', [Validators.required]);
      this.setValidators('contratType', [Validators.required]); // Activation de contratType
      this.clearValidators(['duration']);
    } else if (this.isInternship) {
      this.setValidators('duration', [Validators.required, Validators.min(1), Validators.max(12)]);
      this.clearValidators(['salary', 'experienceLevel', 'contratType']);
    } else {
      this.clearValidators(['salary', 'experienceLevel', 'duration', 'contratType']);
    }
  }
  

  onContratTypeChange(value: string): void {
    this.isCDD = value === 'CDD';
    if (this.isCDD) {
      this.setValidators('duration', [Validators.required, Validators.min(1)]);
    } else {
      this.clearValidators(['duration']);
      this.offerForm.patchValue({ duration: null });
    }
  }

  onEnterpriseInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEnterprises = this.enterprises.filter((enterprise) =>
      enterprise.name.toLowerCase().includes(input)
    );
  }

  onEnterpriseSelected(event: any): void {
    const selectedEnterprise = this.enterprises.find(
      (enterprise) => enterprise.name === event.option.value
    );
    if (selectedEnterprise) {
      this.offerForm.patchValue({
        enterpriseLocation: selectedEnterprise.location,
        enterpriseWebsite: selectedEnterprise.website
      });
    }
  }

  onSubmit(): void {
    if (this.offerForm.invalid) {
      console.error('Le formulaire est invalide.');
      return;
    }
  
    this.isLoading = true;
    const formValues = this.offerForm.value;
  
    const existingEnterprise = this.enterprises.find(
      (e) => e.name.toLowerCase() === formValues.enterpriseName.toLowerCase()
    );
  
    const handleCreateOffer = (enterpriseId: string) => {
      const newOffer: Partial<Offer> = {
        enterpriseId,
        title: formValues.title,
        description: formValues.description,
        domain: formValues.domain,
        location: formValues.location,
        salary: formValues.salary,
        duration: formValues.duration,
        type: formValues.type,
        contractType: formValues.contratType,
        contactEmail: formValues.recruitmentEmail,
        expirationDate: new Date(formValues.expirationDate),
        isRemote: formValues.isRemote,
        applicationMode: formValues.applicationMode,
        isRequiredCvDoc: formValues.isRequiredCvDoc,
        isRequiredMlDoc: formValues.isRequiredMlDoc,
        canAddOthersDoc: formValues.canAddOthersDoc,
        requirements: formValues.requirement,
        responsibilities: formValues.responsabilities,
        status: formValues.status,
        physicalAddress: formValues.physicalAddress
      };
  
      this.offerService.createOffer(newOffer).subscribe({
        next: () => {
          console.log('Offre créée avec succès.');
          this.isLoading = false;
          this.offerForm.reset();  // Reset the form after success
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'offre:', err);
          this.isLoading = false;
        }
      });
    };
  
    if (existingEnterprise) {
      handleCreateOffer(existingEnterprise._id);
    } else {
      const newEnterprise: Partial<Enterprise> = {
        name: formValues.enterpriseName,
        location: formValues.enterpriseLocation,
        email: formValues.recruitmentEmail,
        size: 'MEDIUM',  // Default value for size
        website: formValues.enterpriseWebsite
      };
  
      this.enterpriseService.createEnterprise(newEnterprise).subscribe({
        next: (createdEnterprise: Enterprise) => {
          handleCreateOffer(createdEnterprise._id);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'entreprise:', err);
          this.isLoading = false;
        }
      });
    }
  }
  

  private createOffer(enterpriseId: string, formValues: any): void {
    const newOffer: Partial<Offer> = {
      enterpriseId,
      title: formValues.title,
      description: formValues.description,
      domain: formValues.domain,
      location: formValues.location,
      salary: formValues.salary,
      duration: formValues.duration,
      type: formValues.type,
      contractType: formValues.contratType,
      contactEmail: formValues.recruitmentEmail,
      expirationDate: new Date(formValues.expirationDate),
      isRemote: formValues.isRemote,
      applicationMode: formValues.applicationMode,
      isRequiredCvDoc: formValues.isRequiredCvDoc,
      isRequiredMlDoc: formValues.isRequiredMlDoc,
      canAddOthersDoc: formValues.canAddOthersDoc,
      requirements: formValues.requirement,
      responsibilities: formValues.responsabilities,
      status: formValues.status,
      physicalAddress: formValues.physicalAddress
    };

    this.offerService.createOffer(newOffer).subscribe(() => {
      console.log('Offre créée avec succès.');
    });
  }

  private setValidators(field: string, validators: any[]): void {
    this.offerForm.get(field)?.setValidators(validators);
    this.offerForm.get(field)?.updateValueAndValidity();
  }

  private clearValidators(fields: string[]): void {
    fields.forEach(field => {
      this.offerForm.get(field)?.clearValidators();
      this.offerForm.get(field)?.updateValueAndValidity();
    });
  }
}
