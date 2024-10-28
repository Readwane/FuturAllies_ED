import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: 'pages', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule) },
  // {path: 'dasboards', loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
