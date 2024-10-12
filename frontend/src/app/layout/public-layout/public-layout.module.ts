import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
    CommonModule,
    PublicLayoutRoutingModule
  ],
  exports: [
    HomeComponent,
  ]
})
export class PublicLayoutModule { }
