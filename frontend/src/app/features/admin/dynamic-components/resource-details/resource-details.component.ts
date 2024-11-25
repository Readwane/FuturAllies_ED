import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { FieldType, Resource, ResourceFieldConfig } from '../../models/resource.model';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {
  @Input() resource!: Resource;
  resourceData: { [key: string]: any } = {};  // Typage explicite
  fieldsConfig: ResourceFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID non trouvé dans l\'URL');
      return;
    }
  
    this.resourceService.getResource(this.resource.name, id).subscribe(
      (data: Record<string, any>) => {  // 'Record<string, any>' permet une indexation plus flexible
        this.resourceData = data;
  
        this.fieldsConfig = this.resource.displayableColumns?.map((column) => ({
          name: column,
          label: this.getColumnLabel(column),
          type: this.getFieldType(data[column]),
        })) || [];
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
  

  // Fonction pour déterminer le type du champ basé sur les données
  private getFieldType(value: any): FieldType {
    if (typeof value === 'string') return FieldType.TEXT;
    if (typeof value === 'number') return FieldType.NUMBER;
    if (typeof value === 'boolean') return FieldType.CHECKBOX;
    if (value instanceof Date) return FieldType.DATE;
    return FieldType.TEXT; // Par défaut, on retourne TEXT
  }

  // Fonction pour récupérer un label spécifique en fonction du nom du champ (optionnel)
  private getColumnLabel(column: string): string {
    const fieldConfig = this.fieldsConfig.find(config => config.name === column);
    return fieldConfig ? fieldConfig.label : column;
  }
}
