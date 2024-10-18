export class CourseLearned {
    userId: string;
    courseId: string;
    startedAt: Date;
    completedAt?: Date;
    progress: number;
  
    constructor(
      userId: string,
      courseId: string,
      startedAt: Date = new Date(),
      completedAt?: Date,
      progress: number = 0.0
    ) {
      this.userId = userId;
      this.courseId = courseId;
      this.startedAt = startedAt;
      this.completedAt = completedAt;
      this.progress = progress;
    }
  }
  