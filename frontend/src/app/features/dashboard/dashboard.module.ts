import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { EmployerDashboardModule } from './employer-dashboard/employer-dashboard.module';
import { TrainerDashboardModule } from './trainer-dashboard/trainer-dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminDashboardModule,
    UserDashboardModule,
    EmployerDashboardModule,
    TrainerDashboardModule
  ]
})
export class DashboardModule { }
