import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']  // Correction de "styleUrl" à "styleUrls"
})
export class InscriptionComponent implements OnInit {
  registrationForm: FormGroup;
  cvUploaded = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      ville: ['', Validators.required],
      ecole: ['', Validators.required],
      filiere: ['', Validators.required],
      classe: ['', Validators.required],
      diplome: ['', Validators.required],
      cv: [null],
      lettre: [null],
      bulletins: [null],
      experiences: this.fb.array([]),
      competences: this.fb.array([]),
      formations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.registrationForm.get('cv')?.valueChanges.subscribe(cv => {
      this.cvUploaded = !!cv;
      if (this.cvUploaded) {
        this.clearManualCV();
      }
    });
  }

  // Gestion des FormArray pour les expériences, compétences et formations
  get experiences(): FormArray {
    return this.registrationForm.get('experiences') as FormArray;
  }

  get competences(): FormArray {
    return this.registrationForm.get('competences') as FormArray;
  }

  get formations(): FormArray {
    return this.registrationForm.get('formations') as FormArray;
  }

  addExperience(): void {
    const experienceGroup = this.fb.group({
      experienceDetail: ['']
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addCompetence(): void {
    const competenceGroup = this.fb.group({
      competenceDetail: ['']
    });
    this.competences.push(competenceGroup);
  }

  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }

  addFormation(): void {
    const formationGroup = this.fb.group({
      formationDetail: ['']
    });
    this.formations.push(formationGroup);
  }

  removeFormation(index: number): void {
    this.formations.removeAt(index);
  }

  // Réinitialiser les champs manuels de CV en cas de téléchargement de CV
  clearManualCV(): void {
    this.experiences.clear();
    this.competences.clear();
    this.formations.clear();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        if (control?.value !== null && control?.value !== '') {
          if (key === 'cv' || key === 'lettre' || key === 'bulletins') {
            formData.append(key, control!.value);
          } else if (control instanceof FormArray) {
            control.controls.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item.value[key + 'Detail']);
            });
          } else {
            formData.append(key, control!.value);
          }
        }
      });

      console.log('Formulaire envoyé', formData);
    } else {
      console.log('Formulaire invalide');
    }
  }
}



