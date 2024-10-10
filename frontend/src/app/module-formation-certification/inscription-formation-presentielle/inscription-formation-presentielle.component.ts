import { Component } from '@angular/core';
import { DomaineService } from '../acceuil-formation/acceuil-formation-services/acceuil-formations-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-formation-presentielle',
  templateUrl: './inscription-formation-presentielle.component.html',
  styleUrls: ['./inscription-formation-presentielle.component.css']
})
export class InscriptionFormationPresentielleComponent {

 
 cours:any[]=[]
 matieres:any[]=[]
 domaines:any[]=[]
id1_nom:any[]=[]
nom_domaines:any[]=[]

  constructor(private domaineService: DomaineService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadCours_presentiel();
    this.loadMatiere_id_nom()
    this.filtrer_nom_id()
    this.loadMatiere_nom_domaine()

  }
  
  loadCours_presentiel(): void {
    this.domaineService.getCours_presentiel().subscribe(data => {
      this.cours = data;
    
    });
  }


  loadMatiere_id_nom(): void {
    this.domaineService.getMatieres().subscribe(data => {
      this.matieres = data
      this.filtrer_nom_id()
    });
  }

  loadMatiere_nom_domaine(): void {
    this.domaineService.getDomaines().subscribe(data => {
      this.domaines = data
      this.filtrer_nom_domaine()
    });
  }


  filtrer_nom_id(){
   this.id1_nom=this.matieres.filter(matiere=>this.cours.some(cour=>cour.fk_coursId===matiere.id))    
   }
  
   filtrer_nom_domaine(){

  }
     
    
  
  onSelectCours_presentiel(idcoursPresentiel: string): void {
    this.router.navigate([`/FormationPresentiel/${idcoursPresentiel}/coursPresentielForms`]); // Redirection vers la page des matières du domaine sélectionné
  }

}  