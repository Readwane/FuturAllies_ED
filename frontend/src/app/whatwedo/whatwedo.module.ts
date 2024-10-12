import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatWeDoRoutingModule} from './whatwedo-routing.module';
import { DomainComponent } from './audition/components/domain/domain.component';
import { LearningPathComponent } from './audition/components/learning-path/learning-path.component';
import { CourseComponent } from './audition/components/course/course.component';
import { CertificationComponent } from './audition/components/certification/certification.component';


@NgModule({
  declarations: [
    DomainComponent,
    LearningPathComponent,
    CourseComponent,
    CertificationComponent
  ],
  imports: [
    CommonModule,
    WhatWeDoRoutingModule
  ]
})
export class ServicesModule { }
