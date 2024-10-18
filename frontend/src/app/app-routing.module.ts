import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'layouts', loadChildren: () => import('./layout/layout-routing.module').then(m => m.LayoutRoutingModule) },
  { path: 'whatwedos', loadChildren: () => import('./whatwedo/whatwedo-routing.module').then(m => m.WhatWeDoRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
