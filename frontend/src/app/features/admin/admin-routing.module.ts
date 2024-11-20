import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/users/students/students.component';
import { StudentDetailsComponent } from './components/users/students-details/students-details.component';
import { CUsersComponent } from './components/users/c-users/c-users.component';
import { UUsersComponent } from './components/users/u-users/u-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { GenericCreateComponent } from './components/generic-create/generic-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut
      { path: 'dashboard', component: DashboardComponent }, // Tableau de bord
      { path: 'users', component: UsersComponent},
      { path: 'c-users', component: CUsersComponent },
      { path: 'u-users', component: UUsersComponent }, 
      { path: 'students', component: StudentsComponent }, // Gestion des étudiants
      { path: 'students/:id', component: StudentDetailsComponent }, // Page des détails
      // Ajoutez d'autres routes enfants ici
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
