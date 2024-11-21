import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/users/students/students.component';
import { StudentDetailsComponent } from './components/users/students-details/students-details.component';
import { CUsersComponent } from './components/users/c-users/c-users.component';
import { UUsersComponent } from './components/users/u-users/u-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, // Composant contenant le layout de l'admin
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection vers le tableau de bord
      { path: 'dashboard', component: DashboardComponent }, // Tableau de bord
      
      // Gestion des utilisateurs
      {
        path: 'users',
        children: [
          { path: 'list-users/students', component: StudentsComponent }, // Liste des étudiants
          { path: 'list-users/trainers', component: ListUsersComponent }, // Liste des formateurs
          //{ path: 'list-users/enterprises', component: EnterprisesComponent }, // Liste des entreprises
          //{ path: 'list-users/managers', component: ManagersComponent }, // Liste des managers
          //{ path: 'list-users/admins', component: AdminsComponent }, // Liste des administrateurs
          { path: 'details/:id', component: UserDetailsComponent }, // Page des détails
          { path: 'edit/:id', component: UUsersComponent }, // Page d'édition
          { path: 'create', component: CUsersComponent }, // Page de création
        ]
      },
      
      // Autres sections comme "students"
      { path: 'students/:id', component: StudentDetailsComponent }, // Page des détails étudiants
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
