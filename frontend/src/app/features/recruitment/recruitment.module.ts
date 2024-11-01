import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruitmentRoutingModule } from './recruitment-routing.module';

import { OfferManagementComponent } from './components/offer-management/offer-management.component';


@NgModule({
  declarations: [
    OfferManagementComponent,
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OfferManagementComponent
  ]
})
export class RecruitmentModule { }
