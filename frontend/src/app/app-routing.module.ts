import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AcceuilComponent } from './features/pages/home/components/acceuil/acceuil.component';
import { UserProfileTypeComponent } from './features/payment/components/user-profile-type/user-profile-type.component';
import { PaymentMethodesComponent } from './features/payment/components/payment-methodes/payment-methodes.component';
import { OmPaymentComponent } from './features/payment/components/om-payment/om-payment.component';
import { MmPaymentComponent } from './features/payment/components/mm-payment/mm-payment.component';
import { CourseLearningComponent } from './features/pages/course-learning/course-learning.component';
import { FlwtestComponent } from './features/payment/components/flwtest/flwtest.component';

const routes: Routes = [

  {
    path: '', component: AcceuilComponent
  },
  {
    path: 'course-learning', component: CourseLearningComponent
  },
 
  {
    path: 'trainings',
    loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule)
  },
  
  {
    path: 'offers',
    loadChildren: () => import('./features/offer/offer.module').then(m => m.OfferModule)
  },
  {
    path: 'audition',
    loadChildren: () => import('./features/audition/audition.module').then(m => m.AuditionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
 
  { path: 'flwtest', component: FlwtestComponent },
  { path: 'subscription', component: UserProfileTypeComponent },
  { path: 'payment-methodes', component: PaymentMethodesComponent },
  {path: 'om-payment', component: OmPaymentComponent},
  {path: 'mm-payment', component: MmPaymentComponent},

  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers une page d'accueil (exemple)
  // { path: '**', redirectTo: '/home' } // Redirection vers la page d'accueil pour les routes non trouvées (exemple)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
