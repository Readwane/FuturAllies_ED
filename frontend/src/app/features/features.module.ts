import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerDashboardModule } from './employer-dashboard/employer-dashboard.module';
import { AdminModule } from './admin/admin.module';
import { AuditionModule } from './audition/audition.module';
import { CertificationModule } from './certification/certification.module';
import { OfferModule } from './offer/offer.module';
import { OrientationModule } from './orientation/orientation.module';
import { TrainingModule } from './training/training.module';

@NgModule({
  declarations: [],
  imports: [
    OfferModule,
    CommonModule,
    AdminModule,
    AuditionModule,
    TrainingModule,
    OrientationModule,
    CertificationModule,
    EmployerDashboardModule
  ]
})
export class FeaturesModule { }
