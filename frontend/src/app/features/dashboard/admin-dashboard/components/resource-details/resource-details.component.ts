import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dynamic-detail',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css'],
  providers: [
    TitleCasePipe
  ]
})

export class ResourceDetailsComponent implements OnInit {

  resourceData: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const resourceType = params.get('type') || '';
      const resourceId = Number(params.get('id'));
      
      // Récupération de la ressource en fonction du type et de l'ID
      this.resourceData = this.adminService.getResourceByTypeAndId(resourceType, resourceId);
    });
  }

    // Méthode pour obtenir les clés de l'objet
    objectKeys(obj: any): string[] {
      return Object.keys(obj);
    }


}
