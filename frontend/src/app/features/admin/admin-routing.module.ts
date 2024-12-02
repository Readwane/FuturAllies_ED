import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CUsersComponent } from './components/users/c-users/c-users.component';
import { UUsersComponent } from './components/users/u-users/u-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserResolver } from 'src/app/core/services/user/user-resolver.service';
import { ResourceListComponent } from './dynamic-components/resource-list/resource-list.component';
import { ResourceCreateComponent } from './dynamic-components/resource-create/resource-create.component';
import { ResourceEditComponent } from './dynamic-components/resource-edit/resource-edit.component';
import { ResourceDetailsComponent } from './dynamic-components/resource-details/resource-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list/:resourceType/', component: ResourceListComponent },
      { path: 'list/:resourceType/:resourceChild', component: ResourceListComponent },
      { path: 'create/:resourceType', component: ResourceCreateComponent },
      { path: 'edit/:resourceType/:id', component: ResourceEditComponent },
      { path: 'details/:resourceType/:id', component: ResourceDetailsComponent },
    ]
  }



  // {
  // path: '',
  //   component: AdminComponent, 
  //   children: [

  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' , data: { breadcrumb: 'Administration' },},
  //     { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
    
  //     {
  //       path: 'users',
  //       component: ListUsersComponent, 
  //       data: { breadcrumb: 'Users' },
  //       children: [
  //         { 
  //           path: 'students', 
  //           component: ListUsersComponent, 
  //           data: { breadcrumb: 'Students', type: 'student' }
  //         },
  //         { 
  //           path: 'trainers', 
  //           component: ListUsersComponent, 
  //           data: { breadcrumb: 'Trainers', type: 'trainer' }
  //         },
  //         {
  //           path: 'details/:id',
  //           component: UserDetailsComponent,
  //           data: { breadcrumb: 'User Details' },
  //           resolve: { breadcrumbData: UserResolver }
  //         },
  //         {
  //           path: 'edit/:id',
  //           component: UUsersComponent,
  //           data: { breadcrumb: 'User Edit' },
  //           resolve: { breadcrumbData: UserResolver }
  //         },
  //         { 
  //           path: 'create', 
  //           component: CUsersComponent, 
  //           data: { breadcrumb: 'User Create' }
  //         }
  //       ]
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
