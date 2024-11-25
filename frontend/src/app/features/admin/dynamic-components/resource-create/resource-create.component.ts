import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../../services/resource.service';
import { Resource, ResourceFieldConfig, FieldType } from '../../models/resource.model';

@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.css']
})
export class ResourceCreateComponent implements OnInit {
  @Input() resource!: Resource;
  resourceForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private resourceService: ResourceService
  ) {
    this.resourceForm = this.fb.group({});
  }

  ngOnInit() {
    const editableColumns = this.resource?.editableColumns ?? [];
  
    if (editableColumns.length > 0) {
      const formControls: { [key: string]: any } = {};
  
      editableColumns.forEach((key) => {
        const fieldConfig = this.getFieldConfig(key);
  
        // Appliquer les validations en fonction du type de champ
        let validators = [Validators.required]; // Par défaut, tout champ est requis
  
        // Ajouter des validations spécifiques basées sur le type du champ
        if (fieldConfig) {
          if (fieldConfig.type === FieldType.EMAIL) {
            validators.push(Validators.email);
          } else if (fieldConfig.type === FieldType.TEL) {
            validators.push(Validators.pattern('^[0-9]{10}$')); // Exemple de pattern pour un numéro de téléphone
          }
          if (fieldConfig.minLength) {
            validators.push(Validators.minLength(fieldConfig.minLength));
          }
          if (fieldConfig.maxLength) {
            validators.push(Validators.maxLength(fieldConfig.maxLength));
          }
        }
  
        // Créer les contrôles de formulaire dynamiquement
        formControls[key] = ['', validators];
      });
  
      this.resourceForm = this.fb.group(formControls);
    }
  }
  
  

  private getFieldConfig(key: string): ResourceFieldConfig | undefined {
    return this.resource?.['fields'].find((field: { name: string; }) => field.name === key);
  }

  onCreate() {
    if (this.resourceForm.valid) {
      this.resourceService.createResource(this.resource.name, this.resourceForm.value).subscribe(() => {
        this.router.navigate([`/${this.resource.name}`]);
      });
    } else {
      console.log('Le formulaire est invalide.');
    }
  }
}
