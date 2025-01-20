import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LastActivitiesComponent } from './components/last-activites/last-activites.component';
import { ListOfferComponent } from './components/list-offer/list-offer.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CandidatListComponent } from './components/candidat-list/candidat-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard',  component: DashboardComponent, },
      {path: 'last-activities', component: LastActivitiesComponent},
      {path: 'list/offers/:status', component: ListOfferComponent},
      {path: 'create/:status', component: CreateOfferComponent},
      {path: 'list/candidats/:type/:status', component: CandidatListComponent},
      {path: 'list/candidats/:offerId', component: CandidatListComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}