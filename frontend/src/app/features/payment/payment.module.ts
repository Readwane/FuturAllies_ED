import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentMethodesComponent } from './components/payment-methodes/payment-methodes.component';
import { PaymentCardFormComponent } from './components/payment-card-form/payment-card-form.component';
import { PaymentMobileFormComponent } from './components/payment-mobile-form/payment-mobile-form.component';
import { environment } from 'src/environments/environment';
import { CardPaymentFormComponent } from './components/card-payment-form/card-payment-form.component';

@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentMethodesComponent,
    PaymentCardFormComponent,
    PaymentMobileFormComponent,
    CardPaymentFormComponent
  ],
  imports: [
    CommonModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLISHABLE_KEY), // Remplacez par votre clé publique Stripe
  ],
  exports:[
    PaymentFormComponent,
    PaymentMethodesComponent,
    PaymentCardFormComponent,
    PaymentMobileFormComponent,
    CardPaymentFormComponent
  ]
})
export class PaymentModule {
 }
