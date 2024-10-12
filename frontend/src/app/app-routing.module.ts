import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'layouts', loadChildren: () => import('./layout/layout-routing.module').then(m => m.LayoutRoutingModule) },
  { path: 'webinars', loadChildren: () => import('./webinar/webinar-routing.module').then(m => m.WebinarRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
