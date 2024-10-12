import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnairesModulesServiceService } from '../gestionnaire-modules/gestionnaires-modules-service/gestionnaires-modules-service.service';
import { GestionnairesCoursServiceService } from './gestionnaires-cours-service/gestionnaires-cours-service.service';

@Component({
  selector: 'app-gestionnaire-cours',
  templateUrl: './gestionnaire-cours.component.html',
  styleUrls: ['./gestionnaire-cours.component.css']
})
export class GestionnaireCoursComponent implements OnInit{

  constructor(private matiereService: GestionnairesCoursServiceService,  private fb: FormBuilder, private router: ActivatedRoute, private route:Router) { }
  selectedDomaineIndex:string=""
  __iconDelete__:boolean=false
  __iconVoirMatiere__:boolean= false
  __addDomaine__:boolean=false

  ondelete():void{
    this.__iconDelete__=!this.__iconDelete__
    this.__iconVoirMatiere__=false
  }




  onVoirMatiere():void{
    this.__iconVoirMatiere__=!this.__iconVoirMatiere__
    this.__iconDelete__=false
  }


  selecterDomaine(domaine:string){
    this.__iconVoirMatiere__=true
    this.__iconDelete__=false
    this.selectedDomaineIndex=domaine
      
  }

  OnAdd():void{
    this.__addDomaine__=!this.__addDomaine__
    this.__iconDelete__=false
    this.__iconVoirMatiere__= false
  }


  iddomaineGestionnaireId: string | null = null;
  __matieresGestionnaire__: any[] = [];
  __filteredMatieresGestionnaire__: any[] = [];
 
  
  
  ngOnInit(): void {
    this.iddomaineGestionnaireId = this.router.snapshot.paramMap.get('iddomaineGestionnaireId');
    this.loadCoursgestionnaire();
    this.InitFormDomain()
   this.__matieresGestionnaire__=this.matiereService.matiereGestionnaire
  }
  
  loadCoursgestionnaire(): void {
    this.matiereService.getMatieres().subscribe(data => {
      this.__matieresGestionnaire__ = data;
      this.filterMatieresGestionnaire()
      console.log( this.iddomaineGestionnaireId)
    });
  }



  filterMatieresGestionnaire(): void {
    if (this.iddomaineGestionnaireId) {
      this.__filteredMatieresGestionnaire__ = this.__matieresGestionnaire__.filter(matiere => matiere.fk_domaineId === this.iddomaineGestionnaireId);
    }
  }


  onSelectgestionnaireCours(coursGestionnaireId: string): void {
    this.route.navigate([`/gestionnaire/${coursGestionnaireId}/gestionnairecontenuCours`]); // Redirection vers la page des matières du domaine sélectionné
 
  }





  MatiereForm!: FormGroup;

  InitFormDomain(): void {
    this.MatiereForm = this.fb.group({ 
      nom: '',
    });
  }


  ajouterNouvelleMatiere(matiereNom: string): void {
    if (this.iddomaineGestionnaireId) {
    const nouvelleMatiere = {
        // Le nom ou autre attribut de la nouvelle matière
        fk_domaineId: this.iddomaineGestionnaireId,  // Associer la matière au domaine sélectionné
        nom:matiereNom,
    }
    

      this.matiereService.addMatieres(nouvelleMatiere).subscribe(response => {
        console.log('Nouvelle matière ajoutée avec succès', response);
        
        // Optionnel : Actualiser la liste des matières après ajout
        this.filterMatieresGestionnaire();
      });
    } else {
      console.error('Aucun domaine sélectionné');
    }
  }
  





 

  onSubmit(){
    const nom= this.MatiereForm.value.nom;
    console.log(nom)
    this.ajouterNouvelleMatiere(nom)
    this.loadCoursgestionnaire()
    this.OnAdd();
   
  }



  
}
