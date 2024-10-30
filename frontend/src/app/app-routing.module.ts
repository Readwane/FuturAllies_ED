import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AcceuilComponent } from './features/pages/home/components/acceuil/acceuil.component';
import { PaymentFormComponent } from './features/payment/components/payment-form/payment-form.component';
import { PaymentCardFormComponent } from './features/payment/components/payment-card-form/payment-card-form.component';
import { PaymentMobileFormComponent } from './features/payment/components/payment-mobile-form/payment-mobile-form.component';
import { CardPaymentFormComponent } from './features/payment/components/card-payment-form/card-payment-form.component';
import { UserProfileTypeComponent } from './features/payment/components/user-profile-type/user-profile-type.component';
import { PaymentMethodesComponent } from './features/payment/components/payment-methodes/payment-methodes.component';
import { OmPaymentComponent } from './features/payment/components/om-payment/om-payment.component';
import { MmPaymentComponent } from './features/payment/components/mm-payment/mm-payment.component';
import { CourseLearningComponent } from './features/pages/course-learning/course-learning.component';

const routes: Routes = [
  {
    path: '', component: AcceuilComponent
  },
  {
    path: 'course-learning', component: CourseLearningComponent
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
  //   path: 'payment',
  //   loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule),
  //   // canActivate: [AuthGuard]
  // },

  { path: 'card-payment', component: CardPaymentFormComponent },
  { path: 'subscription', component: UserProfileTypeComponent },
  { path: 'payment-methodes', component: PaymentMethodesComponent },
  {path: 'om-payment', component: OmPaymentComponent},
  {path: 'mm-payment', component: MmPaymentComponent},
  // { path: 'mm-payment', component: MmPaymentComponent },
  // { path: 'sank-money', component: SankMoneyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers une page d'accueil (exemple)
  { path: '**', redirectTo: '/home' } // Redirection vers la page d'accueil pour les routes non trouvées (exemple)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
