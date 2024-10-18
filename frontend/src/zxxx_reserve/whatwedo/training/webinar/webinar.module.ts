import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebinarRoutingModule } from './webinar-routing.module';
import { WebinarComponent } from './components/webinar/webinar.component';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';
import { WebinarDetailsComponent } from './components/webinar-details/webinar-details.component';
import { WebinarEnrollComponent } from './components/webinar-enrollment/webinar-enrollment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebinarComponent,
    WebinarListComponent,
    WebinarDetailsComponent,
    WebinarEnrollComponent 
  ],
  imports: [
    CommonModule,
    WebinarRoutingModule,
    ReactiveFormsModule
  
  ],
  exports: [
    WebinarComponent,
    WebinarListComponent,
    WebinarDetailsComponent,
    WebinarEnrollComponent 
  ],
})
export class WebinarModule { }
