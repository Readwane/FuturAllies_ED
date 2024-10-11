import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { CoreRoutingModule } from './core-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HeaderModule
  ]
})
export class CoreModule { }
