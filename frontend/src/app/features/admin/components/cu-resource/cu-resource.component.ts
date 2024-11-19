import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FieldConfig {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: { value: string; label: string }[];
}

@Component({
  selector: 'app-cu-resource',
  templateUrl: './cu-resource.component.html',
  styleUrls: ['./cu-resource.component.css']
})
export class CuResourceComponent implements OnInit {
  @Input() resource: any = {}; // Données de la ressource
  @Input() fieldsConfig: FieldConfig[] = []; // Configuration des champs
  @Input() mode: 'create' | 'update' = 'create'; // Mode : 'create' ou 'update'
  @Output() formSubmit = new EventEmitter<any>(); // Émet les données du formulaire

  form!: FormGroup; // Utilisation de `!` pour indiquer que cette propriété sera initialisée

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const formControls: { [key: string]: any } = {};

    this.fieldsConfig.forEach((field) => {
      formControls[field.name] = [
        this.resource[field.name] || '', // Valeur par défaut
        this.getValidators(field) // Validations dynamiques
      ];
    });

    this.form = this.fb.group(formControls);
  }

  getValidators(field: FieldConfig) {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    if (field.minLength) validators.push(Validators.minLength(field.minLength));
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    return validators;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value); // Émet les données du formulaire
    }
  }
}