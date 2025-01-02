import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MaterialModule,
  ],
  exports: [
    DashboardComponent,
    MenuComponent,
  ],
})
export class UserDashboardModule { }
