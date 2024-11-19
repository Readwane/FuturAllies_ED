// app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu'; // Pour le menu utilisateur
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { DynamicMenuComponent } from './components/dynamic-menu/dynamic-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/users/students/students.component';
import { StudentDetailsComponent } from './components/users/students-details/students-details.component';
import { CuResourceComponent } from './components/cu-resource/cu-resource.component';
import { CuUsersComponent } from './components/cu-users/cu-users.component';



@NgModule({
  declarations: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    CuResourceComponent,
    CuUsersComponent
  ],
  imports: [

    AdminRoutingModule,
    
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    NgxChartsModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatOptionModule
  ],
  exports: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    CuResourceComponent,
    CuUsersComponent
  ]
})
export class AdminModule { }
