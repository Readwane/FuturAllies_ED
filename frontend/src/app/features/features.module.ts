import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesModule } from './pages/pages.module';
import { PaymentModule } from './payment/payment.module';
import { WebinarModule } from './webinar/webinar.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AuthenticationModule,
    DashboardModule,
    PagesModule,
    PaymentModule,
    WebinarModule
  ]
})
export class FeaturesModule { }
