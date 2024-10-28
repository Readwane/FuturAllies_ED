import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AcceuilComponent } from './features/pages/home/components/acceuil/acceuil.component';

const routes: Routes = [
  {
    path: '', component: AcceuilComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'audition',
    loadChildren: () => import('./features/audition/audition.module').then(m => m.AuditionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/dashboard/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/dashboard/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trainer',
    loadChildren: () => import('./features/dashboard/trainer-dashboard/trainer-dashboard.module').then(m => m.TrainerDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employer',
    loadChildren: () => import('./features/dashboard/employer-dashboard/employer-dashboard.module').then(m => m.EmployerDashboardModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'auth/login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'auth/login'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
