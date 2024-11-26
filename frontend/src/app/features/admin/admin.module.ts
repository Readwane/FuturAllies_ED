import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { DynamicMenuComponent } from './components/dynamic-menu/dynamic-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/users/students/students.component';
import { StudentDetailsComponent } from './components/users/students-details/students-details.component';
import { CuResourceComponent } from './components/cu-resource/cu-resource.component';
import { CUsersComponent } from './components/users/c-users/c-users.component';
import { UUsersComponent } from './components/users/u-users/u-users.component';
import { GenericListingComponent } from './components/generic-listing/generic-listing.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { GenericCreateComponent } from './components/generic-create/generic-create.component';
import { GenericEditComponent } from './components/generic-edit/generic-edit.component';
import { GenericDetailsComponent } from './components/generic-details/generic-details.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ResourceListComponent } from './dynamic-components/resource-list/resource-list.component';
import { ResourceEditComponent } from './dynamic-components/resource-edit/resource-edit.component';
import { ResourceCreateComponent } from './dynamic-components/resource-create/resource-create.component';
import { ResourceDetailsComponent } from './dynamic-components/resource-details/resource-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dynamic-components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    CuResourceComponent,
    CUsersComponent,
    UUsersComponent,
    GenericListingComponent,
    ListUsersComponent,
    GenericCreateComponent,
    GenericEditComponent,
    GenericDetailsComponent,
    UserDetailsComponent,
    BreadcrumbsComponent,

    // dynamic-components
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent
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
    MatOptionModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule 
  ],
  exports: [
    AdminComponent,
    DynamicMenuComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    CuResourceComponent,
    CUsersComponent,
    UUsersComponent,
    GenericListingComponent,
    ListUsersComponent,
    GenericCreateComponent,
    GenericEditComponent,
    GenericDetailsComponent,
    UserDetailsComponent,
    BreadcrumbsComponent,

    // dynamic-components
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent
  ]
})

export class AdminModule { }
