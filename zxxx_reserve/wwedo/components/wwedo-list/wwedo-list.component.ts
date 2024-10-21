// components/services-list/services-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Wwedo } from '../../models/wwedo.model';
import { WwedoService } from '../../wwedo.service';

@Component({
  selector: 'app-wwedo-list',
  templateUrl: './wwedo-list.component.html',
  styleUrls: ['./wwedo-list.component.css'],
})
export class WwedoListComponent implements OnInit {
  wwedos: Wwedo[] = [];
  loading: boolean = true; // Variable pour suivre l'état de chargement

  constructor(private wwedoService: WwedoService) {}

  ngOnInit(): void {
    this.getWwedos();
  }

  getWwedos(): void {
    this.loading = true; // Commencer le chargement
    this.wwedoService.getWwedos().subscribe(
      (data: Wwedo[]) => {
        this.wwedos = data;
        this.loading = false; // Les données sont chargées, arrêter le chargement
        console.log('wwedos récupérés :', this.wwedos);
      },
      (      error: any) => {
        console.error('Erreur lors de la récupération des webinaires', error);
        this.loading = false; // En cas d'erreur, arrêter le chargement
      }
    );
  }
}
