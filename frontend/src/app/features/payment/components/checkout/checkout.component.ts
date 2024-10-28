import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
payment: any;
  stripe: any;  
  paymentService: any;
  clientSecret: any;
  elements: any;
  notificationHandlerService: any;
  environment: any;
  ngOnInit(): void {
      this.invokeStripe();
  }
  
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (<any>window).Stripe(environment.STRIPE_SECRET_KEY);
       };
       window.document.body.appendChild(script);
      }
    }


    // preparePayment(id) {
    //   const data = { via: 'stripe' };
    //   this.paymentService.preparePayment(data, id).subscribe((res: { [x: string]: any; }) => {
    //     this.clientSecret = res['client_secret'];
    //     this.initialize();
    //   });
    // }
  


    async initialize() {
      let emailAddress = '';
      const clientSecret = this.clientSecret;
      const appearance = {
        theme: 'stripe',
      };
      this.elements = this.stripe.elements({ appearance, clientSecret });
      const linkAuthenticationElement =
        this.elements.create('linkAuthentication');
      linkAuthenticationElement.mount('#link-authentication-element');
      linkAuthenticationElement.on('change', (event: { value: { email: string; }; }) => {
        emailAddress = event.value.email;
      });
      const paymentElementOptions = {
        layout: 'tabs',
      };
      const paymentElement = this.elements.create(
        'payment',
        paymentElementOptions
      );
      paymentElement.mount('#payment-element');
    }


    async makePayment() {
      let elements = this.elements;
      const res = await this.stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: this.environment.site + 'payment/checkout',
          receipt_email: '',
        },
      });
      this.notificationHandlerService.showNotification(
        'error',
        'Error',
        res.error.message
      );
    }
  }

