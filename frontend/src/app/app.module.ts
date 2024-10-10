import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ModuleFormationCertificationModule } from './module-formation-certification/module-formation-certification.module';
import { RouterModule } from '@angular/router';
import { PremiumEtudiantComponent } from './gestion-abonnements-premium/premium-etudiant/premium-etudiant.component';
import { GestionUtilisateursModule } from './gestion-utilisateurs/gestion-utilisateurs.module';
import { AcceuilFormationComponent } from './module-formation-certification/acceuil-formation/acceuil-formation.component';
import { OrientationAcceuilComponent } from './orientations/orientation-acceuil/orientation-acceuil.component';
import { EtablissementsComponent } from './orientations/etablissements/etablissements.component';
import { OrientationsModule } from './orientations/orientations.module';
import { CardModuleComponent } from './module-formation-certification/domaines-listes/domaines.component';
import { GestionnaireModule } from './gestionnaire/gestionnaire.module';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WebinarModule } from './webinar/webinar.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule, 
    GestionUtilisateursModule, 
    OrientationsModule, 
    GestionnaireModule, 
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    WebinarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
