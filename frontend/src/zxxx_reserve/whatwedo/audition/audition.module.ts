import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditionRoutingModule } from './audition-routing.module';
import { DomainComponent } from './components/domain/domain.component';
import { LearningPathComponent } from './components/learning-path/learning-path.component';
import { CourseComponent } from './components/course/course.component';
import { CertificationComponent } from './components/certification/certification.component';


@NgModule({
  declarations: [
    DomainComponent,
    LearningPathComponent,
    CourseComponent,
    CertificationComponent
  ],
  imports: [
    CommonModule,
    AuditionRoutingModule
  ]
})
export class AuditionModule { }
