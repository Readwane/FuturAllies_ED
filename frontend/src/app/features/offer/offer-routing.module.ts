import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CreateOfferComponent } from './components/dashboard/create-offer/create-offer.component';
import { ListOfferComponent } from './components/dashboard/list-offer/list-offer.component';

const routes: Routes = [

      {path: '', component: OfferListComponent,},
      {path: 'details/:id', component: OfferDetailsComponent,},
      {path: 'application/:id', component: OfferApplicationComponent,},
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'dashboard', component: DashboardComponent,
        children: [
          // { path: 'dashboard', component: DashboardComponent },
          // { path: 'stats-offer', component: StatsOfferComponent },
          // { path: 'last-activities', component: LastActivitiesComponent },
          { path: 'list-offer', component: ListOfferComponent },
          { path: 'create-offer', component: CreateOfferComponent },
          // { path: 'list-candidat', component: ListCandidatComponent },
          // { path: 'company-profile', component: CompanyProfileComponent },
          // { path: 'notification-settings', component: NotificationSettingsComponent },
          // { path: 'user-management', component: UserManagementComponent },
          // { path: 'security-settings', component: SecuritySettingsComponent },

        ]
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
