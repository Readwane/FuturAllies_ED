import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplication } from './models/offer-application.model';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';

const routes: Routes = [
  {
    path: '', component: OfferListComponent,
  },
  {
    path: 'offer-details/:id', component: OfferDetailsComponent,
  },
  {
    path: 'offer-application/:id', component: OfferApplicationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
