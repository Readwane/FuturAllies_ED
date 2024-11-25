import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { PagesModule } from './pages/pages.module';
import { PaymentModule } from './payment/payment.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
  ]
})
export class FeaturesModule { }
