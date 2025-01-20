import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditionModule } from './audition/audition.module';
import { OfferModule } from './offer/offer.module';
import { TrainingModule } from './training/training.module';
import { PaymentModule } from './payment/payment.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuditionModule,
    TrainingModule,
    OfferModule,
    PaymentModule,
    TrainingModule,
  ]
})
export class FeaturesModule { }
