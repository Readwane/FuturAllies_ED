import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLISHABLE_KEY), // Remplacez par votre clé publique Stripe
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    
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
