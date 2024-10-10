import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomaineService } from '../acceuil-formation/acceuil-formation-services/acceuil-formations-services';

@Component({
  selector: 'app-card-module',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class CardModuleComponent implements OnInit {

  constructor(private domaineService: DomaineService, private router: ActivatedRoute, private route:Router) { }

  domaineId: string | null = null;
  matieres: any[] = [];
  filteredMatieres: any[] = [];

  ngOnInit(): void {
    // Récupérer l'ID du domaine à partir de l'URL
    this.domaineId = this.router.snapshot.paramMap.get('domaineId');
    console.log(this.domaineId)
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.domaineService.getMatieres().subscribe(data => {
      this.matieres = data;
      this.filterMatieres(); // Filtrer les matières en fonction de l'ID du domaine
    });
  }
  filterMatieres(): void {
    if (this.domaineId) {
      this.filteredMatieres = this.matieres.filter(matiere => matiere.fk_domaineId === this.domaineId);
    }
  }

  onSelectDomaine(coursId: string): void {
    this.route.navigate([`/cours/${coursId}/content`]); // Redirection vers la page des matières du domaine sélectionné
  }
}
