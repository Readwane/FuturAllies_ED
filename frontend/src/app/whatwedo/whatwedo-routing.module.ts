import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'trainings', loadChildren: () => import('./training/training-routing.module').then(m => m.TrainingRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatWeDoRoutingModule { }
