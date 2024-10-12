import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
    HomeModule
  ],
  exports: []
})
export class PublicLayoutModule { }
