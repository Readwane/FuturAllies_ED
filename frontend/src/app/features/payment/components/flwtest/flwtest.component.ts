import { Component } from '@angular/core';
declare var FlutterwaveCheckout: any;

@Component({
  selector: 'app-flwtest',
  standalone: true,
  templateUrl: './flwtest.component.html',
  styleUrls: ['./flwtest.component.css']
})
export class FlwtestComponent {

  makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
      tx_ref: "txref-DI0NzMx13",
      amount: 2500,
      currency: "XOF",
      payment_options: "card, banktransfer, ussd",
      meta: {
        source: "docs-inline-test",
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "tegawendego@gmail.com",
        phone_number: "70987031",
        name: "Tegawende",
      },
      customizations: {
        title: "Flutterwave Developers",
        description: "Test Payment",
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
      callback: (data: any) => {
        console.log("payment callback:", data);
      },
      onclose: () => {
        console.log("Payment cancelled!");
      }
    });
  }

}
