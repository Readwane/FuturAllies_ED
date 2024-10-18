import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationRoutingModule } from './certification-routing.module';
import { CertificationComponent } from './components/certification/certification.component';
import { CertificationListComponent } from './components/certification-list/certification-list.component';
import { CertificationProgramComponent } from './components/certification-program/certification-program.component';
import { CertificationEnrollmentComponent } from './components/certification-enrollment/certification-enrollment.component';


@NgModule({
  declarations: [
    CertificationComponent,
    CertificationListComponent,
    CertificationProgramComponent,
    CertificationEnrollmentComponent
  ],
  imports: [
    CommonModule,
    CertificationRoutingModule
  ]
})
export class CertificationModule { }
