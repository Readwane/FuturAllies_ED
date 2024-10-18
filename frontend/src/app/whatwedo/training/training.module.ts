import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { WebinarModule } from './webinar/webinar.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    WebinarModule
  ]
})
export class TrainingModule { }
