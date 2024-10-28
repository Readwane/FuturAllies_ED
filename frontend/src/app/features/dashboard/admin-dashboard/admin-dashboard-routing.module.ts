import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGuard } from '../../../core/guards/admin.guard';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';

const routes: Routes = [
  // { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: '', component: AdminHomeComponent },
  { path: 'details/:type/:id', component: ResourceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
