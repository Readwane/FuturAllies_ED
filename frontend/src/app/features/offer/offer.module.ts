import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplicationComponent } from './components/offer-application/offer-application.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { OfferRoutingModule } from './offer-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

 

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
  declarations: [
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
    OfferApplicationComponent,
  ],
})
export class OfferModule { }
