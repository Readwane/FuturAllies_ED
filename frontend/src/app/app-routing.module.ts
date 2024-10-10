import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturationComponent } from './gestion-abonnements-premium/facturation/facturation.component';
import { PremiumEmployeurComponent } from './gestion-abonnements-premium/premium-employeur/premium-employeur.component';
import { PremiumCandidatComponent } from './gestion-abonnements-premium/premium-candidat/premium-candidat.component';
import { PremiumEtudiantComponent } from './gestion-abonnements-premium/premium-etudiant/premium-etudiant.component';
import { PagesEtudiantsComponent } from './module-formation-certification/pages-etudiants/pages-etudiants.component';
import { ModuleFormationCertificationComponent } from './module-formation-certification/module-formation-certification.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PagesCandidatComponent } from './module-formation-certification/pages-candidat/pages-candidat.component';
import { ContenuLibreComponent } from './module-formation-certification/contenu-libre/contenu-libre.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { RegistrationComponent } from './gestion-utilisateurs/inscription/inscription.component';
import { ConnexionComponent } from './gestion-utilisateurs/connexion/connexion.component';
import { InscriptionFormationPresentielleComponent } from './module-formation-certification/inscription-formation-presentielle/inscription-formation-presentielle.component';
import { FormationPourCertificationComponent } from './module-formation-certification/formation-pour-certification/formation-pour-certification.component';
import { AcceuilFormationComponent } from './module-formation-certification/acceuil-formation/acceuil-formation.component';
import { EtablissementsComponent } from './orientations/etablissements/etablissements.component';
import { OrientationsComponent } from './orientations/orientations.component';
import { OrientationAcceuilComponent } from './orientations/orientation-acceuil/orientation-acceuil.component';
import { QizContenuLibreComponent } from './module-formation-certification/qiz-contenu-libre/quiz-contenu-libre.component';
import { CardModuleComponent } from './module-formation-certification/domaines-listes/domaines.component';
import { CardModuleComponent2 } from './module-formation-certification/domaines-listes2/domaines2.component';
import { SuivieCoursComponent } from './module-formation-certification/contenu-cours/suivie_cours.component';
import { InscriptionComponent } from './module-formation-certification/inscription_cours/inscription.component';
import { CoursComponent } from './module-formation-certification/cours/cours.component';
import { GestionnaireAcceuilComponent } from './gestionnaire/gestionnaire-acceuil/gestionnaire-acceuil.component';
import { GestionnaireModulesComponent } from './gestionnaire/gestionnaire-modules/gestionnaire-modules.component';
import { GestionnaireCoursComponent } from './gestionnaire/gestionnaire-cours/gestionnaire-cours.component';
import { GestionnaireContenuCoursComponent } from './gestionnaire/gestionnaire-contenu-cours/gestionnaire-contenu-cours.component';

// Importer le module de routage des webinaires
import { WebinarRoutingModule } from './webinar/webinar-routing.module';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'facturation', component: FacturationComponent },
  { path: 'premiumCandidat', component: PremiumCandidatComponent },
  { path: 'premiumEmployeur', component: PremiumEmployeurComponent },
  { path: 'premiumEtudiant', component: PremiumEtudiantComponent },
  { path: 'acceuil', component: AcceuilComponent },
  
  { path: 'formation', component: ModuleFormationCertificationComponent, children: [
      { path: 'pagesEtudiant', component: PagesEtudiantsComponent },
      { path: 'pagesCandidat', component: PagesCandidatComponent },
      { path: 'contenuLibre', component: ContenuLibreComponent }, 
      { path: 'certification', component: FormationPourCertificationComponent },
      { path: 'FormationPresentielle', component: InscriptionFormationPresentielleComponent },
      { path: 'quiz', component: QizContenuLibreComponent },
      { path: 'module2', component: CardModuleComponent2 },
      { path: 'cours', component: SuivieCoursComponent },
    ]
  },

  { path: 'domaines', component: AcceuilFormationComponent },
  { path: 'domaines/:domaineId/cours', component: CardModuleComponent },
  { path: 'cours/:coursId/content', component: CoursComponent },

  { path: 'FormationPresentiel', component: InscriptionFormationPresentielleComponent },
  { path: 'FormationPresentiel/:idcoursPresentiel/coursPresentielForms', component: InscriptionComponent },

  // Utiliser le module de routage des webinaires ici
  { path: 'webinars', loadChildren: () => import('./webinar/webinar-routing.module').then(m => m.WebinarRoutingModule) },

  { path: 'usersPages', component: GestionUtilisateursComponent, children: [
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: ConnexionComponent },
    ]
  },

  { path: 'gestionnaire', component: GestionUtilisateursComponent, children: [
      { path: 'acceuil', component: GestionnaireAcceuilComponent },
      { path: 'modules', component: GestionnaireModulesComponent }
    ]
  },

  { path: 'gestionnaire/:iddomaineGestionnaireId/gestionnaireCours', component: GestionnaireCoursComponent },
  { path: 'gestionnaire/:coursGestionnaireId/gestionnairecontenuCours', component: GestionnaireContenuCoursComponent },

  { path: 'orientation', component: OrientationsComponent, children: [
      { path: 'orientationAcceuil', component: OrientationAcceuilComponent },
      { path: 'etablissement', component: EtablissementsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
