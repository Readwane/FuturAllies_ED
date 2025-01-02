import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enterprise } from 'src/app/core/models/user/enterprise.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Offer } from 'src/app/features/offer/models/offer.model';
import { EnterpriseService } from 'src/app/features/offer/services/enterprise.service';
import { OfferService } from 'src/app/features/offer/services/offer.service';

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
      type: ['', Validators.required],
      enterpriseName: ['', Validators.required],
      enterpriseLocation: ['', Validators.required],
      enterpriseWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      recruitmentEmail: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      domain: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      requirement: ['', Validators.required],
      responsabilities: ['', Validators.required],
      salary: [null, Validators.min(0)],
      experienceLevel: ['', Validators.required],
      duration: [null, [Validators.min(1), Validators.max(12)]],
      contratType: ['', Validators.required]
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

    if (this.isJob) {
      this.setValidators('salary', [Validators.required, Validators.min(0)]);
      this.setValidators('experienceLevel', [Validators.required]);
      this.clearValidators(['duration', 'contratType']);
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

    // Vérifier si l'entreprise existe déjà
    const existingEnterprise = this.enterprises.find(
      (e) => e.name.toLowerCase() === formValues.enterpriseName.toLowerCase()
    );

    if (existingEnterprise) {
      // Utiliser l'entreprise existante pour créer l'offre
      this.createOffer(existingEnterprise._id, formValues);
    } else {
      // Créer une nouvelle entreprise et utiliser son ID pour l'offre
      const newEnterprise: Partial<Enterprise> = {
        name: formValues.enterpriseName,
        location: formValues.enterpriseLocation,
        email: formValues.recruitmentEmail,
        size: 'MEDIUM', // Remplir par défaut ou demander à l'utilisateur
        website: formValues.enterpriseWebsite
      };

      this.enterpriseService.createEnterprise(newEnterprise).subscribe((createdEnterprise: Enterprise) => {
        this.createOffer(createdEnterprise._id, formValues);
      });
    }

    setTimeout(() => {
      console.log('Offre soumise avec succès :', this.offerForm.value);
      this.isLoading = false; // Cache le spinner après soumission
    }, 3000);
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
      responsibilities: formValues.responsabilities
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
