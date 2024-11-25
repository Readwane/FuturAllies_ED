import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource, ResourceFieldConfig } from '../../models/resource.model';
import { resourcesConfig } from '../../resource-config/reource.config';  // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  @Input() resource!: Resource;
  resources: any[] = [];
  fieldsConfig: ResourceFieldConfig[] = [];
  columnNames: string[] = []; // Propriété pour les noms de colonnes

  constructor(private resourceService: ResourceService, private router: Router) {}

  ngOnInit() {
    // Charger la configuration de la ressource à partir de resourcesConfig
    const resourceConfig = resourcesConfig[this.resource.name];

    if (resourceConfig) {
      this.fieldsConfig = resourceConfig.fields; // Récupérer les champs de configuration pour cette ressource
      this.columnNames = this.fieldsConfig.map(field => field.name); // Calculer les noms des colonnes

      // Charger les données de la ressource depuis le service
      this.resourceService.getResources(this.resource.name).subscribe(data => {
        this.resources = data;
      });
    }
  }

  onSelect(resource: any) {
    this.router.navigate([`${this.resource.name}/details`, resource.id]);
  }

  onCreate() {
    this.router.navigate([`${this.resource.name}/create`]);
  }
}
