import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/public-layout/home/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'accueil' },
  { path: 'layouts', loadChildren: () => import('./layout/layout-routing.module').then(m => m.LayoutRoutingModule) },
  { path: 'dashboards', loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
