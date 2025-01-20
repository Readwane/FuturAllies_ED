import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';
// import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  // Route pour le tableau de bord
  {
    path: '',
    component: OfferListComponent,
    // data: {
    //   title: 'Tableau de bord',
    //   breadcrumb: 'Tableau de bord',
    //   roles: ['ROLE_RECRUITER', 'ROLE_ADMIN']
    // }
  },

  // Route pour les détails d'une offre (hors tableau de bord)
  { path: 'details/:id', component: OfferDetailsComponent },

  // Route pour postuler à une offre (hors tableau de bord)
  { path: 'application/:id', component: OfferApplicationComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
