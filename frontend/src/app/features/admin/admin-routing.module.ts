import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CUsersComponent } from './components/users/c-users/c-users.component';
import { UUsersComponent } from './components/users/u-users/u-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserResolver } from 'src/app/core/services/user/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    data: { breadcrumb: 'Dashboard' },
    
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },

      {
        path: 'users',
        component: ListUsersComponent,
        data: { breadcrumb: 'Users' }
      },
      { 
        path: 'users/students', 
        component: ListUsersComponent, 
        data: { breadcrumb: 'Students', type: 'student' }
      },
      // { 
      //   path: 'users/trainers', 
      //   component: ListUsersComponent, 
      //   data: { breadcrumb: 'Trainers', type: 'trainer' }
      // },

      { path: 'users/create', component: CUsersComponent },
      { path: 'users/details/:id', component: UserDetailsComponent },
      { path: 'users/edit/:id', component: UUsersComponent }
      
      // {
      //   path: 'users/details/:id',
      //   component: UserDetailsComponent,
      //   data: { breadcrumb: 'User Details' },
      //   resolve: { breadcrumbData: UserResolver }
      // },
      // {
      //   path: 'users/edit/:id',
      //   component: UUsersComponent,
      //   data: { breadcrumb: 'User Edit' },
      //   resolve: { breadcrumbData: UserResolver }
      // },
      // {
      //   path: 'users/create',
      //   component: CUsersComponent,
      //   data: { breadcrumb: 'User Create' }
      // }
      
     

      // {
      //   path: 'users',
      //   component: ListUsersComponent,
      //   data: { breadcrumb: 'Users' },
      //   children: [
          // { 
          //   path: 'students', 
          //   component: ListUsersComponent, 
          //   data: { breadcrumb: 'Students', type: 'student' }
          // },
          // { 
          //   path: 'trainers', 
          //   component: ListUsersComponent, 
          //   data: { breadcrumb: 'Trainers', type: 'trainer' }
          // },
      //     {
      //       path: 'details/:id',
      //       component: UserDetailsComponent,
      //       data: { breadcrumb: 'User Details' },
      //       resolve: { breadcrumbData: UserResolver }
      //     },
      //     {
      //       path: 'edit/:id',
      //       component: UUsersComponent,
      //       data: { breadcrumb: 'User Edit' },
      //       resolve: { breadcrumbData: UserResolver }
      //     },
      //     { 
      //       path: 'create', 
      //       component: CUsersComponent, 
      //       data: { breadcrumb: 'User Create' }
      //     }
      //   ]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
