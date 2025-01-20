import { NgModule } from '@angular/core';
import { EmployerRoutingModule } from './employer-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListOfferComponent } from './components/list-offer/list-offer.component';
import { LastActivitiesComponent } from './components/last-activites/last-activites.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { CandidatListComponent } from './components/candidat-list/candidat-list.component';
import { CommonModules } from 'src/app/shared/common.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
   schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
  declarations: [
    MainComponent,
    DashboardComponent,
    MenuComponent,
    ListOfferComponent,
    LastActivitiesComponent,
    CreateOfferComponent,
    CandidatListComponent,
  ],

  imports: [
    CommonModules,
    EmployerRoutingModule,
    MaterialModule,
  ],
  exports: [
    MainComponent,
    DashboardComponent,
    MenuComponent,
    ListOfferComponent,
    LastActivitiesComponent,
    CreateOfferComponent,
    CandidatListComponent,
  ],

})
export class EmployerModule { }
