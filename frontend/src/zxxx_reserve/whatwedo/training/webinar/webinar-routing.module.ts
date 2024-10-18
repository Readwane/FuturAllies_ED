import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';
import { WebinarDetailsComponent } from './components/webinar-details/webinar-details.component';
import { WebinarEnrollComponent } from './components/webinar-enrollment/webinar-enrollment.component';

const routes: Routes = [
  { path: 'webinar-list', component: WebinarListComponent },
  { path: 'webinar-details/:id', component: WebinarDetailsComponent },
  { path: 'webinar-enroll/:id', component: WebinarEnrollComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarRoutingModule {}
