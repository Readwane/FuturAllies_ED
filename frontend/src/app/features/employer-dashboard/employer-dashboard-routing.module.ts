import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { ListOfferComponent } from './components/list-offer/list-offer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'list', component: ListOfferComponent },
      { path: 'create', component: CreateOfferComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerDashboardRoutingModule { }
