import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { TrainingApplication } from './models/training-application.model';
import { TrainingApplicationComponent } from './components/training-application/training-application.component';

const routes: Routes = [
  {
    path: '', component: TrainingListComponent,
  },
  {
    path: 'details/:id', component: TrainingDetailsComponent,
  },
  {
    path: 'application/:id', component: TrainingApplicationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
