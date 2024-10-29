import { Component, OnInit, ViewChild } from '@angular/core';

import { StripeService} from 'ngx-stripe';
import { StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-payment-form',
  templateUrl: './card-payment-form.component.html',
  styleUrls: ['./card-payment-form.component.css']
})
export class CardPaymentFormComponent {

}
