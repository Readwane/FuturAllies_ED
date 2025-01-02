import { Component, OnInit, Input } from '@angular/core';
import { CourseLearned } from 'src/app/features/audition/models/course-learned.model';

@Component({
  selector: 'app-learned-course',
  templateUrl: './learned-course.component.html',
  styleUrls: ['./learned-course.component.css']
})
export class LearnedCourseComponent implements OnInit {
  @Input() courseLearned: CourseLearned | undefined;

  constructor() {}

  ngOnInit(): void {}
}
