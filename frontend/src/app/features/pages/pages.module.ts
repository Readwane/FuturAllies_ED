import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { CourseLearningComponent } from './course-learning/course-learning.component';


@NgModule({
  declarations: [
    CourseLearningComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule
  ],
  exports: [
    CourseLearningComponent
  ]
})
export class PagesModule { }
