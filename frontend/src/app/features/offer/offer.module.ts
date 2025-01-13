import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { OfferRoutingModule } from './offer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CreateOfferComponent } from './components/dashboard/create-offer/create-offer.component';
import { ListOfferComponent } from './components/dashboard/list-offer/list-offer.component';
import { MenuComponent } from './components/dashboard/menu/menu.component';
import { OfferStatsComponent } from './components/dashboard/offer-stats/offer-stats.component';


@NgModule({
  declarations: [
    CreateOfferComponent,
    DashboardComponent,
    ListOfferComponent,
    MenuComponent,
    OfferStatsComponent,

    OfferComponent,
    OfferApplicationComponent,
    OfferDetailsComponent,
    OfferListComponent,
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OfferRoutingModule
  ],
  exports: [
    OfferComponent,
    OfferListComponent,
    OfferDetailsComponent,
    OfferApplicationComponent

  ],
})
export class OfferModule { }
