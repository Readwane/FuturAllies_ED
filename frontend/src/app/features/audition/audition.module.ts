import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditionRoutingModule } from './audition-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseTakingComponent } from './components/course-taking/course-taking.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseTakingComponent
  ],
  imports: [
    CommonModule,
    AuditionRoutingModule
  ]
})
export class AuditionModule { }
