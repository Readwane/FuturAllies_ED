// public-layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
    HomeModule,
  ],
})
export class PublicLayoutModule {}
