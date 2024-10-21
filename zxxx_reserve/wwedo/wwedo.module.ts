import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WwedoRoutingModule } from './wwedo-routing.module';
import { WwedoComponent } from './components/wwedo/wwedo.component';
import { WwedoListComponent } from './components/wwedo-list/wwedo-list.component';



@NgModule({
  declarations: [
    WwedoComponent
  ],
  imports: [
    CommonModule,
    WwedoRoutingModule
  ],
  exports: [
    WwedoListComponent,
    WwedoComponent
  ]
})
export class WwedoModule { }
