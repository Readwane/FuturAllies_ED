import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-create',
  templateUrl: './generic-create.component.html',
  styleUrls: ['./generic-create.component.css']
})
export class GenericCreateComponent implements OnInit {
  @Input() fieldsConfig: {
    name: string;
    label: string;
    type: string; // Peut inclure "text", "email", "password", "file", "select", "textarea"
    required?: boolean;
    options?: { value: any; label: string }[];
    placeholder?: string;
    multiple?: boolean; // Pour fichiers multiples ou sélections multiples
  }[] = [];

  @Input() submitButtonLabel: string = 'Créer'; // Texte du bouton de soumission
  @Input() defaultValues: Record<string, any> = {}; // Valeurs initiales des champs
  @Input() errorMessages: Record<string, Record<string, string>> = {}; // Messages d'erreurs spécifiques
  @Output() onSubmit = new EventEmitter<any>(); // Événement de soumission du formulaire
  @Output() onCancel = new EventEmitter<any>(); // Événement de soumission du formulaire

  
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const formControls: any = {};

    this.fieldsConfig.forEach(field => {
      formControls[field.name] = [
        this.defaultValues[field.name] || '',
        field.required ? [Validators.required] : []
      ];

      if (field.type === 'email') {
        formControls[field.name][1].push(Validators.email);
      }

      if (field.type === 'password') {
        formControls[field.name][1].push(Validators.minLength(6));
      }
    });

    this.form = this.fb.group(formControls);
  }

  handleFileInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files) {
      this.form.get(fieldName)?.setValue(inputElement.files);
    }
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Affiche les erreurs si le formulaire est invalide
    }
  }

  handleCancel(): void {
    this.onCancel.emit(); // Pas besoin de valider le formulaire pour l'annulation
  }
  
}
