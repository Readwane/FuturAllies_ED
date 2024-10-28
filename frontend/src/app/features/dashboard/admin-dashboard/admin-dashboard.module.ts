import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { OffersManagementComponent } from './components/offers-management/offers-management.component';
import { TrainingsManagementComponent } from './components/trainings-management/trainings-management.component';
import { AuditionsManagementComponent } from './components/auditions-management/auditions-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { OrientationsManagementComponent } from './components/orientations-management/orientations-management.component';
import { CertificationsManagementComponent } from './components/certifications-management/certifications-management.component';
import { ReportsManagementComponent } from './components/reports-management/reports-management.component';
import { ListDisplayComponent } from './components/list-display/list-display.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    OffersManagementComponent,
    TrainingsManagementComponent,
    AuditionsManagementComponent,
    UsersManagementComponent,
    OrientationsManagementComponent,
    CertificationsManagementComponent,
    ReportsManagementComponent,
    ListDisplayComponent,
    ResourceDetailsComponent,

  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ],
  exports: [
    AdminHomeComponent,
    OffersManagementComponent,
    TrainingsManagementComponent,
    AuditionsManagementComponent,
    UsersManagementComponent,
    OrientationsManagementComponent,
    CertificationsManagementComponent,
    ReportsManagementComponent,
    ListDisplayComponent,
    ResourceDetailsComponent,
  ]
})
export class AdminDashboardModule { }
