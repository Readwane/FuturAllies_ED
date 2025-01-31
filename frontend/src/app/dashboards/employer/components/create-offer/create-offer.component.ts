import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/features/offer/services/offer.service';
import { Offer } from 'src/app/features/offer/models/offer.models';
import { User } from 'src/app/core/models/user.models';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent implements OnInit {
  
  currentUser?: User;
  offerForm: FormGroup;
  isLoading = false;
  isJob = false;
  isInternship = false;
  isCDD = false;
  isChecked: boolean = false;
  isDisabled: boolean = false;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.offerForm = this.createOfferForm();
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.currentUser = user;
    }

    this.route.queryParams.subscribe((params) => {
      const offerType = params['type'];
      if (offerType) {
        this.offerForm.patchValue({ type: offerType });
        this.onTypeChange(offerType);
      }
    });

    this.offerForm.get('contractType')?.valueChanges.subscribe((value) => {
      this.onContratTypeChange(value);
    });

    this.offerForm.get('hasPreselection')?.valueChanges.subscribe((value) => {
      if (value) {
        this.offerForm.get('preselectionType')?.setValidators([Validators.required]);
        this.offerForm.get('preselectionQuizMode')?.setValidators([Validators.required]);
      } else {
        this.offerForm.get('preselectionType')?.clearValidators();
        this.offerForm.get('preselectionQuizMode')?.clearValidators();
      }
      this.offerForm.get('preselectionType')?.updateValueAndValidity();
      this.offerForm.get('preselectionMode')?.updateValueAndValidity();
    });

    this.offerForm.get('hasEvaluation')?.valueChanges.subscribe((value) => {
      if (value) {
        this.offerForm.get('evaluationMode')?.setValidators([Validators.required]);
      } else {
        this.offerForm.get('evaluationMode')?.clearValidators();
      }
      this.offerForm.get('evaluationMode')?.updateValueAndValidity();
    });

    this.offerForm.get('hasInterview')?.valueChanges.subscribe((value) => {
      if (value) {
        this.offerForm.get('interviewMode')?.setValidators([Validators.required]);
      } else {
        this.offerForm.get('interviewMode')?.clearValidators();
      }
      this.offerForm.get('interviewMode')?.updateValueAndValidity();
    });
  }

  createOfferForm(): FormGroup {
    return this.fb.group({
      profil: ['', Validators.required],
      topic: ['', Validators.required],
      company: ['', Validators.required],
      companyLocation: ['', Validators.required],
      companyWebsite: ['', [Validators.pattern('https?://.+')]],
      title: ['', Validators.required],
      domain: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      requirements: [''],
      responsibilities: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      status: ['Pending', Validators.required], // Par défaut, l'offre est en attente
      isRemoteWorking: [false],
      applicationMode: ['', Validators.required],
      expirationDate: ['', Validators.required],
      isCvDocRequired: [false],
      isMlDocRequired: [false],
      canAddAdditionalDocs: [false],
      contractType: [''],
      salary: [null, Validators.min(0)],
      experienceLevel: [''],
      duration: [null, [Validators.min(1), Validators.max(12)]],
      benefits: [''],
      applicationLink: [''],
      additionalInfo: [''],
      educationLevel: [''],
      hasPreselection: [false],
      preselectionType: [''],
      preselectionQuizMode: [''],
      hasEvaluation: [false],
      evaluationMode: [''],
      hasInterview: [false],
      interviewMode: [''],
    });
  }

  onTypeChange(type: string): void {
    this.isJob = type === 'Job';
    this.isInternship = type === 'Internship';
    this.isCDD = false;

    if (this.isJob) {
      this.setValidators(['salary', 'experienceLevel', 'contractType'], [Validators.required]);
      this.clearValidators(['duration']);
    } else if (this.isInternship) {
      this.setValidators(['duration'], [Validators.required, Validators.min(1), Validators.max(12)]);
      this.clearValidators(['salary', 'experienceLevel', 'contractType']);
    } else {
      this.clearValidators(['salary', 'experienceLevel', 'duration', 'contractType']);
    }
  }

  onContratTypeChange(value: string): void {
    this.isCDD = value === 'CDD';
    if (this.isCDD) {
      this.setValidators(['duration'], [Validators.required, Validators.min(1)]);
    } else {
      this.clearValidators(['duration']);
      this.offerForm.patchValue({ duration: null });
    }
  }

  private setValidators(fields: string[], validators: any[]): void {
    fields.forEach((field) => {
      const control = this.offerForm.get(field);
      if (control) {
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }

  private clearValidators(fields: string[]): void {
    fields.forEach((field) => {
      const control = this.offerForm.get(field);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this.isChecked = event.checked;
    if (this.isChecked) {
      this.offerForm.get('status')?.setValue('Open');
    } else {
      this.offerForm.get('status')?.setValue('Pending');
    }
  }

  onSubmit(): void {
    if (this.offerForm.invalid) {
      console.error('Le formulaire est invalide.');
      return;
    }

    this.isLoading = true;
    const formValues = this.offerForm.value;

    const newOffer: Offer = {
      _id: '',
      profil: formValues.profil,
      topic: formValues.topic,
      company: formValues.company,
      companyLocation: formValues.companyLocation,
      companyWebsite: formValues.companyWebsite,
      description: formValues.description,
      domain: formValues.domain,
      location: formValues.location,
      salary: formValues.salary,
      duration: formValues.duration,
      type: formValues.type,
      contractType: formValues.contractType,
      contactEmail: formValues.contactEmail,
      expirationDate: new Date(formValues.expirationDate),
      isRemoteWorking: formValues.isRemoteWorking,
      applicationMode: formValues.applicationMode,
      isCvDocRequired: formValues.requiresCvDocument,
      isMlDocRequired: formValues.requiresMotivationLetter,
      canAddAdditionalDocs: formValues.canAddAdditionalDocuments,
      requirements: formValues.requirements,
      responsibilities: formValues.responsibilities,
      status: formValues.status,
      educationLevel: formValues.educationLevel,
      benefits: formValues.benefits,
      applicationLink: formValues.applicationLink,
      additionalInfo: formValues.additionalInfo,
      createdBy: this.currentUser?._id || '',
      postedDate: new Date(),
      updatedDate: new Date(),
      hasPreselection: formValues.isPreselectionEnabled,
      preselectionType: formValues.preselectionType,
      preselectionQuizMode: formValues.preselectionMode,
      hasEvaluation: formValues.isOnlineEvaluation,
      evaluationMode: formValues.evaluationMode,
      hasInterview: formValues.isPhysicalMeetingRequired,
      interviewMode: formValues.meetingMode,
    };

    this.offerService.createOffer(newOffer).subscribe({
      next: () => {
        console.log('Offre créée avec succès.');
        this.isLoading = false;
        this.offerForm.reset({ type: this.offerForm.get('type')?.value });
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'offre:', err);
        this.isLoading = false;
      },
    });
  }
}