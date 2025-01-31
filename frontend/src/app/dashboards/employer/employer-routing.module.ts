import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LastActivitiesComponent } from './components/last-activites/last-activites.component';
import { ListOfferComponent } from './components/list-offer/list-offer.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CandidatListComponent } from './components/candidat-list/candidat-list.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { EvaluationGeneratorComponent } from './components/evaluation-generator/evaluation-generator.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'last-activities', component: LastActivitiesComponent },
      { path: 'list/offers/:status', component: ListOfferComponent },
      { path: 'create/:status', component: CreateOfferComponent },
      { path: 'list/candidats/:offerId', component: CandidatListComponent }, 
      { path: 'quiz', component: EvaluationGeneratorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}