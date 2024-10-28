import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormComponent } from './components/form/form.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { CardComponent } from './components/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PaymentFormComponent,
    CheckoutComponent,
    FormComponent,
    ThanksComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_XXXXXXXXXXXXXXXXXXXXXX'), // Remplacez par votre clé publique Stripe
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[
    PaymentFormComponent,
    CheckoutComponent,
    FormComponent,
    ThanksComponent,
    CardComponent
  ]
})
export class PaymentModule {
 }
