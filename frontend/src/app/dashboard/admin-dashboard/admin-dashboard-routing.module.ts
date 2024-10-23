import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'courses', component: CourseManagementComponent },
  { path: 'roles', component: RoleManagementComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
