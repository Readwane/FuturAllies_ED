import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourceService } from '../../services/resource.service';
import { Resource, Property, FieldType } from '../../models/resource.model';
import { ressources } from '../../configs/reource.config';
import { SelectOption } from '../../models/resource.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.css']
})
export class ResourceCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  resource!: Resource;
  resourceFieldsToEdit!: Property[];
  resourceType!: string;
  isSubmitting: boolean = false;
  fieldOptions: { [key: string]: SelectOption[] } = {}; // Dictionnaire pour stocker les options chargées

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.resourceType = this.route.snapshot.paramMap.get('resourceType')!;
    this.loadResource();
    this.initializeForm();
  }

  private loadResource(): void {
    this.resource = ressources[this.resourceType]?.resource;
    this.resourceFieldsToEdit = this.resource.options.properties.editProperties;

    // Résoudre les options de type 'select' (si elles sont des promesses)
    this.resourceFieldsToEdit.forEach((field) => {
      if (typeof field.options === 'function') {
        field.options().then((options: SelectOption[]) => {
          this.fieldOptions[field.name] = options;
        });
      }
    });

    if (!this.resource) {
      console.error('Ressource introuvable');
      this.location.back();
    }
  }

  private initializeForm(): void {
    const formControls: any = {};

    this.resourceFieldsToEdit.forEach((field) => {
      const controlValidators = field.required ? [Validators.required] : [];
      if (field.type === FieldType.EMAIL) {
        controlValidators.push(Validators.email);
      }
      if (field.type === FieldType.PASSWORD) {
        controlValidators.push(Validators.minLength(6));
      }
      formControls[field.name] = ['', controlValidators];
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
      this.isSubmitting = true;

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirmer la soumission',
          message: 'Êtes-vous sûr de vouloir soumettre ces informations ?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const formData = this.form.value;
          this.resourceService.createResource(this.resourceType, formData).subscribe({
            next: (response) => {
              this.isSubmitting = false;
              this.snackBar.open('Ressource créée avec succès!', 'Fermer', { duration: 3000, panelClass: 'toast-success' });
              this.location.back();
            },
            error: (error) => {
              this.isSubmitting = false;
              this.snackBar.open('Erreur lors de la création de la ressource', 'Fermer', { duration: 3000, panelClass: 'toast-error' });
            }
          });
        } else {
          this.isSubmitting = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  handleCancel(): void {
    this.location.back(); 
  }
}
