import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { AcceuilComponent } from './components/acceuil/acceuil.component';


@NgModule({
  declarations: [
    AcceuilComponent,
  ],

  imports: [
    CommonModule,
    PublicLayoutRoutingModule
  ],
  exports: [
    AcceuilComponent,
  ]
})
export class PublicLayoutModule { }
