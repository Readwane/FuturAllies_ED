import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileTypeComponent } from './features/payment/components/user-profile-type/user-profile-type.component';
import { FlwtestComponent } from './features/payment/components/flwtest/flwtest.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './layout/public/components/home/home.component';
import { AcceuilComponent } from './layout/public/components/acceuil/acceuil.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminAuthGuard } from './dashboards/admin/guards/admin-auth.guard';
import { ALoginComponent } from './dashboards/admin/components/login/a-login.component';
import { RegisterComponent } from './core/components/register/register.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'a-login', component: ALoginComponent },
  { path: 'home', component: HomeComponent},


  // Lazy loading des modules
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'trainings',
    loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule),
  },

  // Routes protégées par AuthGuard
  {
    path: 'audition',
    loadChildren: () => import('./features/audition/audition.module').then(m => m.AuditionModule),
  },
  
  {
    path: 'offers',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule),
    canActivate: [AuthGuard]
  },

  { path: 'flwtest', component: FlwtestComponent },
  { path: 'subscription', component: UserProfileTypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
