import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditionRoutingModule } from './audition-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { DomainComponent } from './components/domain/domain.component';

@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    AuditionRoutingModule,
    MaterialModule
  ],
  exports: [
    DomainComponent
  ],
})
export class AuditionModule { }
