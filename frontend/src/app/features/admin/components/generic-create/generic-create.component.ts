import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-generic-create',
  templateUrl: './generic-create.component.html',
  styleUrls: ['./generic-create.component.css']
})
export class GenericCreateComponent implements OnInit, OnDestroy {
  @Input() fieldsConfig: { 
    name: string; 
    label: string; 
    type: string; 
    required?: boolean; 
    options?: { value: any; label: string }[]; 
    placeholder?: string; 
    multiple?: boolean, 
    tooltip?: string;
   }[] = [];
   
  @Input() submitButtonLabel: string = 'Créer';
  @Input() defaultValues: Record<string, any> = {};
  @Input() errorMessages: Record<string, Record<string, string>> = {};
  @Input() backRoute: string | null = null; // Route optionnelle pour le retour
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>(); // Événement pour le retour

  form!: FormGroup;
  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  constructor(private fb: FormBuilder, private location: Location, private renderer: Renderer2, private el: ElementRef, private overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    // Masquer les tooltips actifs
    this.tooltips.forEach((tooltip) => tooltip.hide(0));

    // Supprimer les conteneurs d'overlays de Material Angular
    this.overlayContainer.getContainerElement().innerHTML = '';

    // Optionnel : Supprimer les éléments tooltips directement dans le DOM
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.renderer.removeChild(this.el.nativeElement, tooltip);
    });
  }

  // Validateur personnalisé pour la correspondance des mots de passe
  private passwordsMatchValidator(formGroup: any): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true }; // Erreur si les mots de passe ne correspondent pas
    }
    return null; // Valide si les mots de passe correspondent
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

    // Initialisation du formulaire avec le validateur de correspondance des mots de passe
    this.form = this.fb.group(formControls, {
      validators: this.passwordsMatchValidator // Ajout du validateur de correspondance
    });
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
      this.form.markAllAsTouched();
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  handleBack(): void {
    // Si backRoute est défini, redirige vers cette route. Sinon, utilise la fonction de retour générique.
    if (this.backRoute) {
      this.location.replaceState(this.backRoute);
    } else {
      this.location.back();
    }
    this.onBack.emit(); // Émet l'événement pour informer le parent
  }
}
