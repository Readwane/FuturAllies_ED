import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferApplication } from './models/offer-application.model';



@NgModule({
  declarations: [
    OfferComponent,
    OfferListComponent,
    OfferDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OfferComponent,
    OfferListComponent,
    OfferDetailsComponent,

  ],
})
export class RecruitmentModule { }
