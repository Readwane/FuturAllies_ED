import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AcceuilComponent } from './features/pages/home/components/acceuil/acceuil.component';
import { PaymentFormComponent } from './features/payment/components/payment-form/payment-form.component';
import { FormComponent } from './features/payment/components/form/form.component';

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
  { path: 'payment', component: PaymentFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers une page d'accueil (exemple)
  { path: '**', redirectTo: '/home' } // Redirection vers la page d'accueil pour les routes non trouvées (exemple)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
