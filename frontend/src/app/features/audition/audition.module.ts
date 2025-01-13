import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { DomainComponent } from './components/domain/domain.component';

@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DomainComponent
  ],
})
export class AuditionModule { }
