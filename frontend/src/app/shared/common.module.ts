import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const commonModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: commonModules,
  exports: commonModules
})

export class CommonModules {}