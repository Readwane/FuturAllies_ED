import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-generic-edit',
  templateUrl: './generic-edit.component.html',
  styleUrls: ['./generic-edit.component.css']
})
export class GenericEditComponent implements OnInit, OnDestroy {
  @Input() fieldsConfig: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: { value: any; label: string }[]; 
    placeholder?: string;
    multiple?: boolean;
    readonly?: boolean;
  }[] = [];

  @Input() resourceData: Record<string, any> = {};
  @Input() submitButtonLabel: string = 'Modifier';
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;

  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private renderer: Renderer2,
    private el: ElementRef,
    private overlayContainer: OverlayContainer
  ) {}

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

  private initializeForm(): void {
    const formControls: any = {};

    this.fieldsConfig.forEach(field => {
      formControls[field.name] = [
        this.resourceData[field.name] || '',
        field.required ? [Validators.required] : []
      ];

      if (field.type === 'email') {
        formControls[field.name][1].push(Validators.email);
      }

      if (field.type === 'password') {
        formControls[field.name][1].push(Validators.minLength(6));
      }
    });

    // Validation personnalisée pour confirm_password
    this.form = this.fb.group(formControls, {
      validators: [this.passwordMatchValidator]
    });
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };  // Les mots de passe ne correspondent pas
    }
    return null;
  };

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
    // Logic to go back to the previous page or a specific route
    this.location.back(); // Ou utilisez un autre mécanisme de navigation si nécessaire
  }
  
  handleFileInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files) {
      this.form.get(fieldName)?.setValue(inputElement.files);
    }
  }
}
