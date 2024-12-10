import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ValueComponent } from './components/value/value.component';



@NgModule({
  declarations: [
    ValueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ValueComponent
  ],
})
export class ValueModule { }
