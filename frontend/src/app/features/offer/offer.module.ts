import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Importer MatCheckboxModule

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';



@NgModule({
  declarations: [
    OfferComponent,
    OfferListComponent,
    OfferDetailsComponent,
    OfferApplicationComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatCheckboxModule,

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
