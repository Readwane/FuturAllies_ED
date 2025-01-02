import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Redirection vers dashboard si l'URL est vide
      // { path: 'dashboard', component: DashboardComponent,},
      // { path: 'list/:resourceType', component: ResourceListComponent },
      // { path: 'list/:resourceType/:resourceChild', component: ResourceListComponent },
      { path: 'create', component: CreateOfferComponent },
      // { path: 'edit/:resourceType/:id', component: ResourceEditComponent },
      // { path: 'details/:resourceType/:id', component: ResourceDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerDashboardRoutingModule { }
