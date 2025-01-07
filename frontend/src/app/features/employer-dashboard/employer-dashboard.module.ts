import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerDashboardRoutingModule } from './employer-dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfferComponent } from './components/list-offer/list-offer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    CreateOfferComponent,
    ListOfferComponent,
  ],
  imports: [
    CommonModule,
    EmployerDashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListOfferComponent,
  ],
  exports: [
    DashboardComponent,
    MenuComponent,
    CreateOfferComponent,
  ],
})
export class EmployerDashboardModule { }
