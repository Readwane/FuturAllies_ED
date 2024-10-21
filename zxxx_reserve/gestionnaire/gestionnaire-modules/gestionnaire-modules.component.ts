import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionnairesModulesServiceService } from './gestionnaires-modules-service/gestionnaires-modules-service.service';

@Component({
  selector: 'app-gestionnaire-modules',
  templateUrl: './gestionnaire-modules.component.html',
  styleUrls: ['./gestionnaire-modules.component.css']
})
export class GestionnaireModulesComponent implements OnInit{


  constructor( private domaineService: GestionnairesModulesServiceService, private router: Router, private fb: FormBuilder ) { }

  selectedDomaineIndex:string=""
  __iconDelete__:boolean=false
  __iconVoirMatiere__:boolean= false
  __addDomaine__:boolean=false

  ondelete():void{
    this.__iconDelete__=!this.__iconDelete__
    this.__iconVoirMatiere__=false
  }

  onEdit():void{
    this.__iconVoirMatiere__=false
    this.__iconDelete__=false
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
  }


  __domaines__: any[] = [];

  
  

  
  loadDomaines(): void {
    this.domaineService.getDomaines().subscribe(data => {
      this.__domaines__ = data;
    });
  }
   







  onSelectDomaine(domaineId: string): void {
    this.router.navigate([`/gestionnaire/${domaineId}/gestionnaireCours`]); // Redirection vers la page des matières du domaine sélectionné
  }





  DomaineForm!: FormGroup;

  InitFormDomain(): void {
    this.DomaineForm = this.fb.group({ 
      nom: '',
    });
  }

  onSubmit(){
  const domaine = this.DomaineForm.value;
  this.domaineService.addDomaine(domaine).subscribe(
    response => {
      console.log('domaine ajouté:', response);
    },
    error => {
      console.error('Erreur lors de l\'ajout du domaine:', error);
    }
  );
  
  this.OnAdd();
  this.loadDomaines();
 
}





ngOnInit(): void {
  this.loadDomaines();
  this.InitFormDomain()
}


}
