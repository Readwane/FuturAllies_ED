import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'publics', loadChildren: () => import('./public-layout/public-layout-routing.module').then(m => m.PublicLayoutRoutingModule) },
  { path: 'loggeds', loadChildren: () => import('./logged-layout/logged-layout-routing.module').then(m => m.LoggedLayoutRoutingModule) },
  { path: 'admins', loadChildren: () => import('./admin-layout/admin-layout-routing.module').then(m => m.AdminLayoutRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { 
  
}
