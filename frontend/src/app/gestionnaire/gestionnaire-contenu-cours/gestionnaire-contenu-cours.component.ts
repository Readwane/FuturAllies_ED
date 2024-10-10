import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomaineService } from 'src/app/module-formation-certification/acceuil-formation/acceuil-formation-services/acceuil-formations-services';

@Component({
  selector: 'app-gestionnaire-contenu-cours',
  templateUrl: './gestionnaire-contenu-cours.component.html',
  styleUrls: ['./gestionnaire-contenu-cours.component.css']
})
export class GestionnaireContenuCoursComponent implements OnInit {


  constructor(private domaineService: DomaineService, private router: ActivatedRoute, private route:Router) { }
  

  coursGestionnaireId: string | null = null;
  coursGestionnaire: any[] = [];
  coursGestionnaireFiltres: any[] = [];

  ngOnInit(): void {
 
    this.loadCoursGestionnaire();
  }

  loadCoursGestionnaire(): void {
    this.domaineService.getCours().subscribe(data => {
      this.coursGestionnaire = data;
      console.log(this.coursGestionnaire)
      this.filterCoursGestionnaire(); // Filtrer les matières en fonction de l'ID du domaine
    });
  }

  filterCoursGestionnaire(): void {
    if (this.coursGestionnaireId) {
      this.coursGestionnaireFiltres = this.coursGestionnaire.filter(cour => cour.fk_domaineId === this.coursGestionnaireId);
    }

  }










}