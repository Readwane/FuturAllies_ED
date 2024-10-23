import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    CourseManagementComponent,
    RoleManagementComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
