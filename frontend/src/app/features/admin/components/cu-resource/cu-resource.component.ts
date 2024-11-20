import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cu-resource',
  templateUrl: './cu-resource.component.html',
  styleUrls: ['./cu-resource.component.css'],
})
export class CuResourceComponent implements OnInit {
  @Input() mode: 'create' | 'update' = 'create'; // Mode (création ou modification)
  @Input() resourceData: any = {}; // Données pour modification
  @Input() fieldsConfig: any[] = []; // Configuration des champs dynamiques
  @Output() submit = new EventEmitter<any>(); // Événement pour soumettre les données
  @Output() cancel = new EventEmitter<void>(); // Événement pour annuler

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.fieldsConfig || this.fieldsConfig.length === 0) {
      console.error('Aucune configuration de champ fournie.');
      return;
    }

    const formControls = this.fieldsConfig.reduce((acc: any, field: any) => {
      acc[field.name] = [
        this.mode === 'update' && this.resourceData[field.name] !== undefined
          ? this.resourceData[field.name] // Valeur existante pour modification
          : '', // Valeur par défaut pour création
        field.required ? Validators.required : [], // Validateurs
      ];
      return acc;
    }, {});

    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      console.error('Formulaire invalide');
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
