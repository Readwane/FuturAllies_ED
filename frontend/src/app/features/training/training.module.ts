import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './components/training/training.component';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { TrainingApplicationComponent } from './components/training-application/training-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    TrainingComponent,
    TrainingDetailsComponent,
    TrainingListComponent,
    TrainingApplicationComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule 
  ],
  exports: [
    TrainingComponent,
    TrainingDetailsComponent,
    TrainingListComponent,
    TrainingApplicationComponent
  ]
})
export class TrainingModule { }
