import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminDashboardModule
  ]
})
export class DashboardModule { }
