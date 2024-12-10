import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileTypeComponent } from './features/payment/components/user-profile-type/user-profile-type.component';
import { PaymentMethodesComponent } from './features/payment/components/payment-methodes/payment-methodes.component';
import { OmPaymentComponent } from './features/payment/components/om-payment/om-payment.component';
import { MmPaymentComponent } from './features/payment/components/mm-payment/mm-payment.component';
import { FlwtestComponent } from './features/payment/components/flwtest/flwtest.component';
import { AuthGuard } from './features/admin/guards/auth.guard';
import { LoginComponent } from './features/admin/components/login/login.component';
import { HomeComponent } from './layout/public/components/home/home.component';

const routes: Routes = [
  // Route par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Route home
  { path: 'home', component: HomeComponent },

  // Lazy loading des modules
  {
    path: 'trainings',
    loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule)
  },

  // Routes protégées par AuthGuard
  {
    path: 'audition',
    loadChildren: () => import('./features/audition/audition.module').then(m => m.AuditionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },

  // Routes publiques
  { path: 'login', component: LoginComponent },
  { path: 'flwtest', component: FlwtestComponent },
  { path: 'subscription', component: UserProfileTypeComponent },
  { path: 'payment-methods', component: PaymentMethodesComponent },
  { path: 'om-payment', component: OmPaymentComponent },
  { path: 'mm-payment', component: MmPaymentComponent },

  // Route 404
  { path: '**', redirectTo: '/home' } // Page non trouvée, redirection vers la home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
