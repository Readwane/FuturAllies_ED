import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { UserModule } from './authentication/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesModule } from './pages/pages.module';
import { PaymentModule } from './payment/payment.module';
import { WebinarModule } from './webinar/webinar.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    UserModule,
    DashboardModule,
    PagesModule,
    PaymentModule,
    WebinarModule
  ]
})
export class FeaturesModule { }
