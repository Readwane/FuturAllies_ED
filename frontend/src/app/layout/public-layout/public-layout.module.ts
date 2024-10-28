// public-layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
  ],
})
export class PublicLayoutModule {}
