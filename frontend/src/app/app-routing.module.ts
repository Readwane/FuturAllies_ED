import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileTypeComponent } from './features/payment/components/user-profile-type/user-profile-type.component';
import { PaymentMethodesComponent } from './features/payment/components/payment-methodes/payment-methodes.component';
import { OmPaymentComponent } from './features/payment/components/om-payment/om-payment.component';
import { MmPaymentComponent } from './features/payment/components/mm-payment/mm-payment.component';
import { FlwtestComponent } from './features/payment/components/flwtest/flwtest.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './layout/public/components/home/home.component';
import { AcceuilComponent } from './layout/public/components/acceuil/acceuil.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminAuthGuard } from './features/admin/guards/admin-auth.guard';
import { ALoginComponent } from './features/admin/components/login/a-login.component';
import { RegisterComponent } from './core/components/register/register.component';

const routes: Routes = [

  { path: '', redirectTo: '/home',  pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'a-login', component: ALoginComponent },
  { path: 'home', component: HomeComponent},
  // { path: '**', redirectTo: '/home' } ,


  // Lazy loading des modules
  {
    path: 'trainings',
    loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule),
    canActivate: [AuthGuard]
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
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule),
    canActivate: [AuthGuard]
  },

  { path: 'flwtest', component: FlwtestComponent },
  { path: 'subscription', component: UserProfileTypeComponent },
  { path: 'payment-methods', component: PaymentMethodesComponent },
  { path: 'om-payment', component: OmPaymentComponent },
  { path: 'mm-payment', component: MmPaymentComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
