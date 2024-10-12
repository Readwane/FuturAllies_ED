import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { PublicLayoutModule } from './public-layout/public-layout.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    PublicLayoutModule
  ]
})
export class LayoutModule { }
