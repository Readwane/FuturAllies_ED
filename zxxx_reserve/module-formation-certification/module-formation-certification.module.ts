import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';
import { ModuleFormationCertificationComponent } from './module-formation-certification.component';
import { ContenuLibreComponent } from './contenu-libre/contenu-libre.component';
import { InscriptionFormationPresentielleComponent } from './inscription-formation-presentielle/inscription-formation-presentielle.component';
import { FormationPourCertificationComponent } from './formation-pour-certification/formation-pour-certification.component';
import { CertificationComponent } from './certification/certification.component';
import { PagesEtudiantsComponent } from './pages-etudiants/pages-etudiants.component';
import { PagesCandidatComponent } from './pages-candidat/pages-candidat.component';
import { CoursComponent } from './cours/cours.component';
import { QizCertificationComponent } from './qiz-certification/qiz-certification.component';
import { QizCoursFormationPresentielleComponent } from './qiz-cours-formation-presentielle/qiz-cours-formation-presentielle.component'
import { AcceuilFormationComponent } from './acceuil-formation/acceuil-formation.component';
import { QizContenuLibreComponent } from './qiz-contenu-libre/quiz-contenu-libre.component';
import { CardModuleComponent } from './domaines-listes/domaines.component';
import { CardModuleComponent2 } from './domaines-listes2/domaines2.component';
import { SuivieCoursComponent } from './contenu-cours/suivie_cours.component';
import { InscriptionComponent } from './inscription_cours/inscription.component';
import { FormulaireComponent } from './inscription-formation-presentielle/formulaire/formulaire.component';
import {  WebinnairesComponent } from './Webinnaires/Webinnaires.component';

@NgModule({
  declarations: [
    ModuleFormationCertificationComponent,
    ContenuLibreComponent,
    InscriptionFormationPresentielleComponent,
    FormationPourCertificationComponent,
    CertificationComponent,
    PagesEtudiantsComponent,
    PagesCandidatComponent,
    CoursComponent,
    QizContenuLibreComponent,
    QizCertificationComponent,
    QizCoursFormationPresentielleComponent, AcceuilFormationComponent, CardModuleComponent,CardModuleComponent2,SuivieCoursComponent, 
    InscriptionComponent, FormulaireComponent,WebinnairesComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule,  HttpClientModule, RouterModule, 
  ]
})
export class ModuleFormationCertificationModule { }
