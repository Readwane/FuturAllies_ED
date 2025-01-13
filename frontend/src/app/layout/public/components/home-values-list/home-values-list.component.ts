import { Component, OnInit } from '@angular/core';
import { Value } from 'src/app/core/models/value.models';
import { ValueService } from 'src/app/core/services/value.service';

@Component({
  selector: 'app-home-values-list',
  templateUrl: './home-values-list.component.html',
  styleUrls: ['./home-values-list.component.css']
})
export class HomeValuesListComponent implements OnInit {
  values: Value[] = [];  // Liste des valeurs récupérées
  isLoading = false;     // Pour afficher un loader pendant la récupération des données
  errorMessage: string | null = null; // Pour afficher un message d'erreur en cas de problème

  constructor(private valueService: ValueService) {}

  ngOnInit(): void {
    this.loadValues();
  }

  loadValues(): void {
    this.isLoading = true; // Lancement du chargement
    this.valueService.getValues().subscribe(
      (data: Value[]) => {
        this.values = data;
        console.log(`Data loaded: `, data);
        this.isLoading = false; // Fin du chargement
      },
      (error) => {
        console.error('Erreur lors du chargement des services:', error);
        this.isLoading = false; // Fin du chargement
        this.errorMessage = 'Une erreur est survenue lors du chargement des valeurs. Veuillez réessayer.';
      }
    );
  }
}
