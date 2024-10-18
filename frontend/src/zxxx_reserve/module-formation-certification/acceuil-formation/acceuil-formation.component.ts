import { DomaineService } from './acceuil-formation-services/acceuil-formations-services';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil-formation',
  templateUrl: './acceuil-formation.component.html',
  styleUrls: ['./acceuil-formation.component.css']
})
export class AcceuilFormationComponent implements OnInit {

  isFixed: boolean = false;
 change: boolean=false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = 20;  // Distance de défilement avant que la navbar ne devienne fixe

    // Ajouter la classe fixed si l'utilisateur a défilé au-delà du seuil
    if (window.pageYOffset > scrollOffset) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }

  change1(){
    this.change=true;
    return this.change
  }
  

domaines: any[] = [];

constructor(private domaineService: DomaineService, private router: Router) { }

ngOnInit(): void {
  this.loadDomaines();
}

loadDomaines(): void {
  this.domaineService.getDomaines().subscribe(data => {
    this.domaines = data;
  });
}

onSelectDomaine(domaineId: string): void {
  this.router.navigate([`/domaines/${domaineId}/cours`]); // Redirection vers la page des matières du domaine sélectionné
}
  



}
