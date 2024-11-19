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

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { DynamicMenuComponent } from './components/dynamic-menu/dynamic-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/users/students/students.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentDetailsComponent } from './components/users/students-details/students-details.component';



@NgModule({
  declarations: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent
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
    MatCheckboxModule
  ],
  exports: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent
  ]
})
export class AdminModule { }
