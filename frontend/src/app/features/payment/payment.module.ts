import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentMethodesComponent } from './components/payment-methodes/payment-methodes.component';
import { PaymentCardFormComponent } from './components/payment-card-form/payment-card-form.component';
import { PaymentMobileFormComponent } from './components/payment-mobile-form/payment-mobile-form.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPaymentCardModule } from 'ng-payment-card';
import {CreditCardFormModule} from 'ng-payment-card-form';
import { UserProfileTypeComponent } from './components/user-profile-type/user-profile-type.component';
import { OmPaymentComponent } from './components/om-payment/om-payment.component';
import { MmPaymentComponent } from './components/mm-payment/mm-payment.component';


@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentMethodesComponent,
    PaymentCardFormComponent,
    PaymentMobileFormComponent,
    UserProfileTypeComponent,
    PaymentMethodesComponent,
    OmPaymentComponent,
    MmPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CreditCardFormModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLISHABLE_KEY), // Remplacez par votre clé publique Stripe
  ],
  exports:[
    PaymentFormComponent,
    PaymentMethodesComponent,
    PaymentCardFormComponent,
    PaymentMobileFormComponent,
    UserProfileTypeComponent,
    PaymentMethodesComponent,
    OmPaymentComponent,
    MmPaymentComponent
  ]
})
export class PaymentModule {
 }
