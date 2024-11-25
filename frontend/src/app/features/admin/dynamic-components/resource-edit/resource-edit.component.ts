import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../../services/resource.service';
import { Resource, ResourceFieldConfig } from '../../models/resource.model';
import { resourcesConfig } from '../../resource-config/reource.config';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css'],
})
export class ResourceEditComponent implements OnInit {
[x: string]: any;
  resource!: Resource;
  resourceFieldsConfig!: ResourceFieldConfig[];
  resourceForm: FormGroup = this.fb.group({});
  resourceId!: string | null;
  resourceType!: string | null;
  config!: { resource: Resource; fields: ResourceFieldConfig[] };
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.resourceType = this.route.snapshot.paramMap.get('resourceType');
    this.resourceId = this.route.snapshot.paramMap.get('id');
  
    // Vérifier si resourceType ou resourceId est null
    if (!this.resourceType) {
      console.error('Type de ressource introuvable.');
      return;
    }
  
    if (!this.resourceId) {
      console.error('ID de la ressource introuvable.');
      return;
    }
  
    this.config = resourcesConfig[this.resourceType];
    if (!this.config) {
      console.error('Configuration de la ressource introuvable.');
      return;
    }
  
    this.resource = this.config.resource;
    this.resourceFieldsConfig = this.config.fields;
  
    this.loading = true;
    this.resourceService.getResource(this.resource.name, this.resourceId).subscribe({
      next: (data) => {
        this.configureForm(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la ressource:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  

  private configureForm(data: any) {
    const formControls = this.resourceFieldsConfig.reduce((controls, config) => {
      controls[config.name] = [data[config.name] || '', this.getValidators(config)];
      return controls;
    }, {} as any);

    this.resourceForm = this.fb.group(formControls);
  }

  private getValidators(config: ResourceFieldConfig) {
    const validators = [];
    if (config.required) validators.push(Validators.required);
    if (config.minLength) validators.push(Validators.minLength(config.minLength));
    if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));
    if (config.pattern) validators.push(Validators.pattern(config.pattern));
    return validators;
  }

  onSave() {
    if (!this.resourceId) {
      console.error('L\'ID de la ressource est introuvable.');
      return;
    }
  
    this.resourceService.updateResource(this.resource.name, this.resourceId, this.resourceForm.value)
      .subscribe({
        next: () => {
          this.router.navigate([`/${this.resource.name}`]);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la ressource :', err);
        },
      });
  }
  
}
