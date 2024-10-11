import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterAproposComponent } from './components/footer-apropos/footer-apropos.component';
import { FooterServicesComponent } from './components/footer-services/footer-services.component';
import { FooterSocialMediasComponent } from './components/footer-social-medias/footer-social-medias.component';


@NgModule({
  declarations: [
    FooterAproposComponent,
    FooterServicesComponent,
    FooterSocialMediasComponent
  ],
  imports: [
    CommonModule,
    FooterRoutingModule
  ]
})
export class FooterModule { }
