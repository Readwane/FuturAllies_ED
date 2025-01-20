import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { AdminModule } from './admin/admin.module';
import { EmployerModule } from './employer/employer.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
  declarations: [],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    AdminModule,
    EmployerModule,
  ]
})
export class DashboardsModule { }
