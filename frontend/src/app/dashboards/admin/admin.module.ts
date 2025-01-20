import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceEditComponent } from './components/resource-edit/resource-edit.component';
import { ResourceCreateComponent } from './components/resource-create/resource-create.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ALoginComponent} from './components/login/a-login.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    ALoginComponent,
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [

    AdminRoutingModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ALoginComponent,
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent,
  ]
})

export class AdminModule { }
