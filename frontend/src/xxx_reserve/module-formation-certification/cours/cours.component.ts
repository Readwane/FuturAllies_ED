import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../acceuil-formation/acceuil-formation-services/acceuil-formations-services';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit{
 
  constructor(private domaineService: DomaineService, private router: ActivatedRoute) { }
  

  coursId: string | null = null;
  cours: any[] = [];
  coursFiltres: any[] = [];

  ngOnInit(): void {
    // Récupérer l'ID du domaine à partir de l'URL
    this.coursId = this.router.snapshot.paramMap.get('coursId');
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.domaineService.getCours().subscribe(data => {
      this.cours = data;
      console.log(this.cours)
      this.filterCours(); // Filtrer les matières en fonction de l'ID du domaine
    });
  }
  filterCours(): void {
    if (this.coursId) {
      this.coursFiltres = this.cours.filter(cour => cour.fk_domaineId === this.coursId);
    }
  }

    
  

}
