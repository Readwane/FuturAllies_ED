// components/services-list/services-list.component.ts
// import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/service/service.model';
import { HomeServicesService } from '../../services/home-services.service';

@Component({
  selector: 'app-home-services-list',
  templateUrl: './home-services-list.component.html',
  styleUrls: ['./home-services-list.component.css'],
  // standalone: true,
  // imports: [NgFor],
})

export class HomeServicesListComponent implements OnInit {
  services: Service[] = [];

  constructor(private homeService: HomeServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.homeService.getServices().subscribe(
      (data: Service[]) => {
        this.services = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des services:', error);
      }
    );
  }
}
